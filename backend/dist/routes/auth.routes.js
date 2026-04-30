"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const authRoutes = (0, express_1.Router)();
exports.authRoutes = authRoutes;
const authController = new auth_controller_1.AuthController();
// Esse arquivo só registra as rotas de autenticação.
// A lógica fica no controller e no service.
authRoutes.post("/register", (request, response) => {
    return authController.register(request, response);
});
authRoutes.post("/login", (request, response) => {
    return authController.login(request, response);
});
// /me precisa validar o token antes de responder.
authRoutes.get("/me", auth_middleware_1.authMiddleware, (request, response) => {
    return response.status(200).json({
        message: "Usuário autenticado",
        user: request.user,
    });
});
authRoutes.post("/logout", (request, response) => {
    return authController.logout(request, response);
});
