import { prisma } from "../lib/prisma"
import {
  createReviewSchema,
  updateReviewSchema,
} from "../schemas/review.schema"

// O service de reviews concentra validações e acesso ao banco.
// Assim o controller fica responsável só por request e response.
export class ReviewService {
  async createReview(userId: string, data: unknown) {
    const parsedData = createReviewSchema.safeParse(data)

    if (!parsedData.success) {
      throw new Error("Preencha todos os campos")
    }

    const {
      title,
      mediaType,
      rating,
      positives,
      negatives,
      tmdbId,
      posterUrl,
      year,
    } = parsedData.data

    if (!title || !mediaType || !rating || !positives || !negatives) {
      throw new Error("Preencha todos os campos")
    }

    if (rating < 0.5 || rating > 5) {
      throw new Error("A nota deve estar entre 0.5 e 5")
    }

    return prisma.review.create({
      data: {
        title,
        mediaType,
        rating,
        positives,
        negatives,
        tmdbId,
        posterUrl,
        year,
        userId,
      },
    })
  }

  async listReviews(userId: string) {
    return prisma.review.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }

  async deleteReview(userId: string, id: string) {
    const review = await prisma.review.findFirst({
      where: { id, userId },
    })

    if (!review) {
      throw new Error("Avaliação não encontrada")
    }

    await prisma.review.delete({
      where: { id },
    })

    return {
      message: "Avaliação excluída com sucesso",
    }
  }

  async updateReview(userId: string, id: string, data: unknown) {
    const parsedData = updateReviewSchema.safeParse(data)

    if (!parsedData.success) {
      throw new Error("Dados inválidos")
    }

    const { rating, positives, negatives } = parsedData.data

    if (rating < 0.5 || rating > 5) {
      throw new Error("A nota deve estar entre 0.5 e 5")
    }

    const review = await prisma.review.findFirst({
      where: { id, userId },
    })

    if (!review) {
      throw new Error("Avaliação não encontrada")
    }

    return prisma.review.update({
      where: { id },
      data: {
        rating,
        positives,
        negatives,
      },
    })
  }
}
