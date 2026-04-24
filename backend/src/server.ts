import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { authRoutes } from "./routes/auth.routes"
import { reviewRoutes } from "./routes/review.routes"

dotenv.config()

const app = express()

// Configurações básicas para o frontend conseguir falar com o backend.
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())

// Rota simples só para saber se o servidor subiu.
app.get("/health", (_req, res) => {
  res.status(200).json({ message: "Backend funcionando" })
})

// Cada grupo de rota fica separado por assunto.
app.use("/auth", authRoutes)
app.use("/reviews", reviewRoutes)

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
