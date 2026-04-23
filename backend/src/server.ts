import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { authRoutes } from "./routes/auth.routes"

dotenv.config()

const app = express()

// Configuracoes basicas para o frontend conseguir conversar com o backend.
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

// Rota simples so para testar se o servidor subiu.
app.get("/health", (_req, res) => {
  res.status(200).json({ message: "Backend funcionando" })
})

// Todas as rotas de autenticacao ficam agrupadas aqui.
app.use("/auth", authRoutes)

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
