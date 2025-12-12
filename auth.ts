import NextAuth from "next-auth"
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/validations";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import type { UserRole } from "./next-auth";
import { sendEmailVerification } from "@/lib/email";

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

        // verificar email esto es opcional
        if (!user.emailVerified) {
          const verifyTokenExits = await db.verificationToken.findFirst({
            where: {
              identifier: user.email
            }
          })

          // si existe un token lo eliminamos usando la clave compuesta
          if (verifyTokenExits?.identifier && verifyTokenExits?.token) {
            await db.verificationToken.delete({
              where: {
                identifier_token: {
                  identifier: verifyTokenExits.identifier,
                  token: verifyTokenExits.token
                }
              }
            })
          }
          // creamos un token
          const token = nanoid()
          await db.verificationToken.create({
            data: {
              identifier: user.email,
              token,
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
            },
          })

          // enviamos e correo electronico de verificaion

          await sendEmailVerification(user.email, token)
          throw new Error("Por favor chequea tu email para verficarlo")
        }

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