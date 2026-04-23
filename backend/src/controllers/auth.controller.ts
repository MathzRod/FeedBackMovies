import { Request, Response } from "express"
import { AuthService } from "../services/auth.service"

// O controller recebe a requisicao HTTP e devolve a resposta.
// A regra de negocio de verdade fica no service.
export class AuthController {
  async register(request: Request, response: Response) {
    try {
      const { name, email, password, confirmPassword } = request.body

      const authService = new AuthService()

      const user = await authService.registerUser({
        name,
        email,
        password,
        confirmPassword,
      })

      return response.status(201).json({
        message: "UsuÃ¡rio criado com sucesso",
        user,
      })
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro interno do servidor"

      const statusCode =
        errorMessage === "Este email jÃ¡ estÃ¡ em uso" ? 409 : 400

      return response.status(statusCode).json({
        error: errorMessage,
      })
    }
  }

  async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body

      const authService = new AuthService()

      const result = await authService.loginUser({
        email,
        password,
      })

      response.cookie("token", result.token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24,
        path: "/",
      })

      return response.status(200).json({
        message: "Login realizado com sucesso",
        token: result.token,
        user: result.user,
      })
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro interno do servidor"

      return response.status(400).json({
        error: errorMessage,
      })
    }
  }

  async logout(_request: Request, response: Response) {
    response.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    })

    return response.status(200).json({
      message: "Logout realizado com sucesso",
    })
  }
}
