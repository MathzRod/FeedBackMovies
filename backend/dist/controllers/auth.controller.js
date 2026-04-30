"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
// O controller recebe a requisição HTTP e devolve a resposta.
// A regra de negócio de verdade fica no service.
class AuthController {
    async register(request, response) {
        try {
            const { name, email, password, confirmPassword } = request.body;
            const authService = new auth_service_1.AuthService();
            const user = await authService.registerUser({
                name,
                email,
                password,
                confirmPassword,
            });
            return response.status(201).json({
                message: "Usuário criado com sucesso",
                user,
            });
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro interno do servidor";
            const statusCode = errorMessage === "Este email já está em uso" ? 409 : 400;
            return response.status(statusCode).json({
                error: errorMessage,
            });
        }
    }
    async login(request, response) {
        try {
            const { email, password } = request.body;
            const authService = new auth_service_1.AuthService();
            const result = await authService.loginUser({
                email,
                password,
            });
            response.cookie("token", result.token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24,
                path: "/",
            });
            return response.status(200).json({
                message: "Login realizado com sucesso",
                token: result.token,
                user: result.user,
            });
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro interno do servidor";
            return response.status(400).json({
                error: errorMessage,
            });
        }
    }
    async logout(_request, response) {
        response.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
        });
        return response.status(200).json({
            message: "Logout realizado com sucesso",
        });
    }
}
exports.AuthController = AuthController;
