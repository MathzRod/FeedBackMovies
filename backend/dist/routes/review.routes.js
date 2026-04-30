"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const express_1 = require("express");
const review_controller_1 = require("../controllers/review.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const reviewRoutes = (0, express_1.Router)();
exports.reviewRoutes = reviewRoutes;
const reviewController = new review_controller_1.ReviewController();
// As rotas de review ficam protegidas porque dependem do usuário logado.
reviewRoutes.post("/", auth_middleware_1.authMiddleware, (request, response) => {
    return reviewController.create(request, response);
});
reviewRoutes.get("/", auth_middleware_1.authMiddleware, (request, response) => {
    return reviewController.list(request, response);
});
reviewRoutes.delete("/:id", auth_middleware_1.authMiddleware, (request, response) => {
    return reviewController.delete(request, response);
});
reviewRoutes.put("/:id", auth_middleware_1.authMiddleware, (request, response) => {
    return reviewController.update(request, response);
});
