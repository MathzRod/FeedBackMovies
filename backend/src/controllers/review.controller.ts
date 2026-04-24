import { Request, Response } from "express"
import { ReviewService } from "../services/review.service"

function getParamValue(param: string | string[]) {
  return Array.isArray(param) ? param[0] : param
}

function getReviewErrorStatus(message: string) {
  if (
    message === "Preencha todos os campos" ||
    message === "A nota deve estar entre 0.5 e 5" ||
    message === "Dados inválidos"
  ) {
    return 400
  }

  if (message === "Avaliação não encontrada") {
    return 404
  }

  return 500
}

// O controller de review recebe a requisição
// e manda a parte de regra para o service.
export class ReviewController {
  private reviewService = new ReviewService()

  async create(request: Request, response: Response) {
    try {
      const userId = request.user?.id

      if (!userId) {
        return response.status(401).json({
          error: "Usuário não autenticado",
        })
      }

      const review = await this.reviewService.createReview(userId, request.body)

      return response.status(201).json(review)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao criar avaliação"

      return response.status(getReviewErrorStatus(errorMessage)).json({
        error: errorMessage,
      })
    }
  }

  async list(request: Request, response: Response) {
    try {
      const userId = request.user?.id

      if (!userId) {
        return response.status(401).json({
          error: "Usuário não autenticado",
        })
      }

      const reviews = await this.reviewService.listReviews(userId)

      return response.status(200).json(reviews)
    } catch {
      return response.status(500).json({
        error: "Erro ao buscar avaliações",
      })
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const id = getParamValue(request.params.id)
      const userId = request.user?.id

      if (!userId) {
        return response.status(401).json({
          error: "Usuário não autenticado",
        })
      }

      const result = await this.reviewService.deleteReview(userId, id)

      return response.status(200).json(result)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao excluir avaliação"

      return response.status(getReviewErrorStatus(errorMessage)).json({
        error: errorMessage,
      })
    }
  }

  async update(request: Request, response: Response) {
    try {
      const id = getParamValue(request.params.id)
      const userId = request.user?.id

      if (!userId) {
        return response.status(401).json({
          error: "Usuário não autenticado",
        })
      }

      const updatedReview = await this.reviewService.updateReview(
        userId,
        id,
        request.body
      )

      return response.status(200).json(updatedReview)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao atualizar avaliação"

      return response.status(getReviewErrorStatus(errorMessage)).json({
        error: errorMessage,
      })
    }
  }
}
