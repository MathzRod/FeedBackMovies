"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Esse middleware protege as rotas privadas.
// Se o token estiver certo, os dados do usuário entram em request.user.
function authMiddleware(request, response, next) {
    const token = request.cookies?.token;
    if (!token) {
        return response.status(401).json({
            error: "Token não informado",
        });
    }
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return response.status(500).json({
                error: "JWT_SECRET não configurado",
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        request.user = {
            id: decoded.sub,
            email: decoded.email,
            role: decoded.role,
        };
        next();
    }
    catch (error) {
        console.error("Erro ao validar token:", error);
        return response.status(401).json({
            error: "Token inválido",
            details: error instanceof Error ? error.message : "Erro desconhecido",
        });
    }
}
