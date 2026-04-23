import { Router } from "express"
import { AuthController } from "../controllers/auth.controller"
import { authMiddleware } from "../middlewares/auth.middleware"

const authRoutes = Router()
const authController = new AuthController()

// Esse arquivo so organiza as rotas e aponta para o controller certo.
authRoutes.post("/register", (request, response) => {
  return authController.register(request, response)
})

authRoutes.post("/login", (request, response) => {
  return authController.login(request, response)
})

// /me usa middleware porque precisa validar o token antes de responder.
authRoutes.get("/me", authMiddleware, (request, response) => {
  return response.status(200).json({
    message: "UsuÃ¡rio autenticado",
    user: request.user,
  })
})

authRoutes.post("/logout", (request, response) => {
  return authController.logout(request, response)
})

export { authRoutes }
