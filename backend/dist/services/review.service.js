"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const prisma_1 = require("../lib/prisma");
const review_schema_1 = require("../schemas/review.schema");
// O service de reviews concentra validações e acesso ao banco.
// Assim o controller fica responsável só por request e response.
class ReviewService {
    async createReview(userId, data) {
        const parsedData = review_schema_1.createReviewSchema.safeParse(data);
        if (!parsedData.success) {
            throw new Error("Preencha todos os campos");
        }
        const { title, mediaType, rating, positives, negatives, tmdbId, posterUrl, year, } = parsedData.data;
        if (!title || !mediaType || !rating || !positives || !negatives) {
            throw new Error("Preencha todos os campos");
        }
        if (rating < 0.5 || rating > 5) {
            throw new Error("A nota deve estar entre 0.5 e 5");
        }
        return prisma_1.prisma.review.create({
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
        });
    }
    async listReviews(userId) {
        return prisma_1.prisma.review.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async deleteReview(userId, id) {
        const review = await prisma_1.prisma.review.findFirst({
            where: { id, userId },
        });
        if (!review) {
            throw new Error("Avaliação não encontrada");
        }
        await prisma_1.prisma.review.delete({
            where: { id },
        });
        return {
            message: "Avaliação excluída com sucesso",
        };
    }
    async updateReview(userId, id, data) {
        const parsedData = review_schema_1.updateReviewSchema.safeParse(data);
        if (!parsedData.success) {
            throw new Error("Dados inválidos");
        }
        const { rating, positives, negatives } = parsedData.data;
        if (rating < 0.5 || rating > 5) {
            throw new Error("A nota deve estar entre 0.5 e 5");
        }
        const review = await prisma_1.prisma.review.findFirst({
            where: { id, userId },
        });
        if (!review) {
            throw new Error("Avaliação não encontrada");
        }
        return prisma_1.prisma.review.update({
            where: { id },
            data: {
                rating,
                positives,
                negatives,
            },
        });
    }
}
exports.ReviewService = ReviewService;
