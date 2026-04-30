"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../lib/prisma");
const auth_schema_1 = require("../schemas/auth.schema");
// O service concentra as regras de cadastro e login.
// Aqui fica validação, consulta no banco e geração do token.
class AuthService {
    async registerUser(data) {
        const parsedData = auth_schema_1.registerSchema.safeParse(data);
        if (!parsedData.success) {
            const firstError = parsedData.error.issues[0]?.message || "Dados inválidos";
            throw new Error(firstError);
        }
        const { name, email, password } = parsedData.data;
        const userAlreadyExists = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (userAlreadyExists) {
            throw new Error("Este email já está em uso");
        }
        // A senha nunca vai para o banco em texto puro.
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma_1.prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
        return user;
    }
    async loginUser(data) {
        const parsedData = auth_schema_1.loginSchema.safeParse(data);
        if (!parsedData.success) {
            const firstError = parsedData.error.issues[0]?.message || "Dados inválidos";
            throw new Error(firstError);
        }
        const { email, password } = parsedData.data;
        const user = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new Error("Email ou senha inválidos");
        }
        const passwordIsValid = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!passwordIsValid) {
            throw new Error("Email ou senha inválidos");
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET não configurado");
        }
        // O token leva os dados básicos do usuário para validar as rotas privadas.
        const token = jsonwebtoken_1.default.sign({
            sub: user.id,
            email: user.email,
            role: user.role,
        }, secret, {
            expiresIn: "1d",
        });
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
            },
        };
    }
}
exports.AuthService = AuthService;
