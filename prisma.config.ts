import { defineConfig } from "prisma/config"
import "dotenv/config"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL no está definida en el .env")
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL
  }
})
