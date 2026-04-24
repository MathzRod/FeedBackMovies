import { Router } from "express"
import { AuthController } from "../controllers/auth.controller"
import { authMiddleware } from "../middlewares/auth.middleware"

const authRoutes = Router()
const authController = new AuthController()

// Esse arquivo só registra as rotas de autenticação.
// A lógica fica no controller e no service.
authRoutes.post("/register", (request, response) => {
  return authController.register(request, response)
})

authRoutes.post("/login", (request, response) => {
  return authController.login(request, response)
})

// /me precisa validar o token antes de responder.
authRoutes.get("/me", authMiddleware, (request, response) => {
  return response.status(200).json({
    message: "Usuário autenticado",
    user: request.user,
  })
})

authRoutes.post("/logout", (request, response) => {
  return authController.logout(request, response)
})

export { authRoutes }
