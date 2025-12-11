import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      // The authorize function is moved to auth.ts to avoid importing Prisma in Edge Runtime
      // This is just a placeholder to satisfy types if needed, or can be left empty if NextAuth allows
      // But typically for the config used in middleware, we just need the providers array to exist
      // The actual logic will be in auth.ts
    }),
  ],
  trustHost: true,
} satisfies NextAuthConfig;