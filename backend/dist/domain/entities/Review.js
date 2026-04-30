"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
class Review {
    constructor(userId, title, mediaType, rating, positivePoints, negativePoints) {
        this.userId = userId;
        this.title = title;
        this.mediaType = mediaType;
        this.rating = rating;
        this.positivePoints = positivePoints;
        this.negativePoints = negativePoints;
        if (!title.trim()) {
            throw new Error("O título é obrigatório");
        }
        if (rating < 0 || rating > 10) {
            throw new Error("A nota deve estar entre 0 e 10");
        }
        if (!positivePoints.trim()) {
            throw new Error("Os pontos positivos são obrigatórios");
        }
        if (!negativePoints.trim()) {
            throw new Error("Os pontos negativos são obrigatórios");
        }
    }
}
exports.Review = Review;
