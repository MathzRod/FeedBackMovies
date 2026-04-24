import { Router } from "express"
import { ReviewController } from "../controllers/review.controller"
import { authMiddleware } from "../middlewares/auth.middleware"

const reviewRoutes = Router()
const reviewController = new ReviewController()

// As rotas de review ficam protegidas porque dependem do usuário logado.
reviewRoutes.post("/", authMiddleware, (request, response) => {
  return reviewController.create(request, response)
})

reviewRoutes.get("/", authMiddleware, (request, response) => {
  return reviewController.list(request, response)
})

reviewRoutes.delete("/:id", authMiddleware, (request, response) => {
  return reviewController.delete(request, response)
})

reviewRoutes.put("/:id", authMiddleware, (request, response) => {
  return reviewController.update(request, response)
})

export { reviewRoutes }
