import { PrismaClient } from "@prisma/client"

// Cliente unico do Prisma para ser reutilizado pelos services.
export const prisma = new PrismaClient()
