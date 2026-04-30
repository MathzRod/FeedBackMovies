"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
// Cliente único do Prisma para ser reutilizado pelos services.
exports.prisma = new client_1.PrismaClient();
