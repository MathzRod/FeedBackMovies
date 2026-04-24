import { PrismaClient } from "@prisma/client"

// Cliente único do Prisma para ser reutilizado pelos services.
export const prisma = new PrismaClient()
