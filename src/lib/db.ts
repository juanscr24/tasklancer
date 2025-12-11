import { PrismaClient } from "@prisma/client";

// Singleton pattern to ensure a single PrismaClient instance
const prismaClientSingleton = () => {
    return new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
};

// Extend the globalThis type to include prismaGlobal
declare const globalThis: {
    // eslint-disable-next-line no-var
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Initialize or reuse the PrismaClient instance
export const db = globalThis.prismaGlobal ?? prismaClientSingleton();

// Assign to globalThis in development for hot-reloading support
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;