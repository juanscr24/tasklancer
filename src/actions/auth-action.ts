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


        // crear el usuario
        const newUser = await db.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: passwordHash,
            },
        });

        try {
            await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });
        } catch (signInError) {
            console.log("9. Sign in failed, but user was created:", signInError);
            // User was created successfully, even if auto-login failed
            // Return success so the user can manually login
        }

        return { success: true };
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