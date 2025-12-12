"use server";


import { db } from "@/lib/db";
import { loginSchema, registerSchema } from "@/validations";
import { signIn, signOut } from "@main/auth";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

import { z } from "zod";
// Define the login action
export const loginAction = async (data: z.infer<typeof loginSchema>) => {
    try {
        // Call the signIn function from NextAuth
        await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,

        })
        return { success: true };
    } catch (error: unknown) {
        if (error instanceof AuthError) {
            // Extract the actual error message from the nested structure
            const cause = error.cause as any;
            if (cause?.err?.message) {
                return { error: cause.err.message };
            }
            return { error: error.message ?? "Error de autenticación" };
        }

        // fallback si no es un Error
        return { error: "Error desconocido" };
    }
}


export const registerAction = async (
    values: z.infer<typeof registerSchema>
) => {
    try {
        console.log("1. Starting registration with:", values.email);
        const { data, success } = registerSchema.safeParse(values);
        if (!success) {
            console.log("2. Validation failed");
            return {
                error: "Invalid data",
            };
        }

        console.log("3. Validation passed, checking if user exists");
        // verificar si el usuario ya existe
        const user = await db.user.findUnique({
            where: {
                email: data.email,
            },
            include: {
                accounts: true, // Incluir las cuentas asociadas
            },
        });

        if (user) {
            return {
                error: "User already exists",
            };
        }

        // hash de la contraseña
        const passwordHash = await bcrypt.hash(data.password, 10);

        // crear el usuario (sin emailVerified todavía)
        const newUser = await db.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: passwordHash,
                emailVerified: null, // No verificado aún
            },
        });

        console.log("4. User created, generating verification token");

        // Generar token de verificación
        const { nanoid } = await import("nanoid");
        const verificationToken = nanoid(32);
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24); // Token válido por 24 horas

        // Guardar el token en la base de datos
        await db.verificationToken.create({
            data: {
                identifier: data.email,
                token: verificationToken,
                expires: expiresAt,
            },
        });

        console.log("5. Verification token created, sending email");

        // Enviar email de verificación
        const { sendEmailVerification } = await import("@/lib/email");
        const emailResult = await sendEmailVerification(data.email, verificationToken);

        if (emailResult.error) {
            console.error("6. Failed to send verification email");
            // El usuario fue creado pero el email falló
            return {
                error: "User created but failed to send verification email. Please contact support.",
            };
        }

        console.log("7. Verification email sent successfully");

        // NO hacer auto-login, el usuario debe verificar su email primero
        return { 
            success: true,
            message: "Registration successful! Please check your email to verify your account."
        };
    } catch (error) {
        console.error("ERROR in registerAction:", error);
        if (error instanceof AuthError) {
            return { error: error.cause?.err?.message };
        }
        return { error: "error 500" };
    }
};


export const signOutAction = async () => {
    await signOut({
        redirectTo: "/auth",
    });
};