import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { prisma } from "../lib/prisma"
import { loginSchema, registerSchema } from "../schemas/auth.schema"

type RegisterUserRequest = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

type LoginUserRequest = {
  email: string
  password: string
}

// O service concentra as regras de cadastro e login.
// Aqui fica validacao, consulta no banco e geracao do token.
export class AuthService {
  async registerUser(data: RegisterUserRequest) {
    const parsedData = registerSchema.safeParse(data)

    if (!parsedData.success) {
      const firstError = parsedData.error.issues[0]?.message || "Dados invÃ¡lidos"
      throw new Error(firstError)
    }

    const { name, email, password } = parsedData.data

    const userAlreadyExists = await prisma.user.findUnique({
      where: { email },
    })

    if (userAlreadyExists) {
      throw new Error("Este email jÃ¡ estÃ¡ em uso")
    }

    // A senha nunca vai para o banco em texto puro.
    const passwordHash = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
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
    })

    return user
  }

  async loginUser(data: LoginUserRequest) {
    const parsedData = loginSchema.safeParse(data)

    if (!parsedData.success) {
      const firstError = parsedData.error.issues[0]?.message || "Dados invÃ¡lidos"
      throw new Error(firstError)
    }

    const { email, password } = parsedData.data

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new Error("Email ou senha invÃ¡lidos")
    }

    const passwordIsValid = await bcrypt.compare(password, user.passwordHash)

    if (!passwordIsValid) {
      throw new Error("Email ou senha invÃ¡lidos")
    }

    const secret = process.env.JWT_SECRET

    if (!secret) {
      throw new Error("JWT_SECRET nÃ£o configurado")
    }

    // O token leva os dados basicos do usuario para validar as rotas protegidas.
    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      secret,
      {
        expiresIn: "1d",
      }
    )

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    }
  }
}
