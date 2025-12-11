import NextAuth from "next-auth"
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/validations";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import type { UserRole } from "./next-auth";

// Create the NextAuth instance with the Prisma adapter and custom configuration
export const { handlers, signIn, signOut, auth } = NextAuth({
  // Spread in the custom auth configuration first
  ...authConfig,

  // Overwrite providers to include the full logic for Credentials
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { data, success } = loginSchema.safeParse(credentials);

        if (!success) {
          throw new Error("Invalid credentials");
        }

        // verificar si existe el usuario en la base de datos
        const user = await db.user.findUnique({
          where: {
            email: data.email,
          },
        });

        if (!user || !user.password) {
          throw new Error("No user found");
        }

        // verificar si la contraseña es correcta
        const isValid = await bcrypt.compare(data.password, user.password);

        if (!isValid) {
          throw new Error("Incorrect password");
        }

        // VERIFICACIÓN DE EMAIL DESHABILITADA TEMPORALMENTE
        // if (!user.emailVerified) {
        //   const verifyTokenExits = await db.verificationToken.findFirst({
        //     where: {
        //       identifier: user.email,
        //     },
        //   });

        //   // si existe un token, lo eliminamos
        //   if (verifyTokenExits?.identifier) {
        //     await db.verificationToken.delete({
        //       where: {
        //         identifier: user.email,
        //       },
        //     });
        //   }

        //   const token = nanoid();

        //   await db.verificationToken.create({
        //     data: {
        //       identifier: user.email,
        //       token,
        //       expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        //     },
        //   });

        //   // enviar email de verificación
        //   // await sendEmailVerification(user.email, token);

        //   throw new Error("Please verify your email address before logging in.");
        // }

        return user;
      },
    }),
  ],

  // Use JWT strategy for session management
  session: { strategy: "jwt" },
  
  callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
        token.email = user.email
        token.role = user.role
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.role = token.role as UserRole
      }
      return session;
    },
  },

  // Add these configurations to prevent the ENVIRONMENT_FALLBACK error
  trustHost: true,

}) 