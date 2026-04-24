import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

type JwtPayload = {
  sub: string
  email: string
  role: string
}

// Esse middleware protege as rotas privadas.
// Se o token estiver certo, os dados do usuário entram em request.user.
export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.cookies?.token

  if (!token) {
    return response.status(401).json({
      error: "Token não informado",
    })
  }

  try {
    const secret = process.env.JWT_SECRET

    if (!secret) {
      return response.status(500).json({
        error: "JWT_SECRET não configurado",
      })
    }

    const decoded = jwt.verify(token, secret) as JwtPayload

    request.user = {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role,
    }

    next()
  } catch (error) {
    console.error("Erro ao validar token:", error)

    return response.status(401).json({
      error: "Token inválido",
      details: error instanceof Error ? error.message : "Erro desconhecido",
    })
  }
}
