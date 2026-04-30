export type MediaType = "movie" | "tv"

export class Review {
  constructor(
    public readonly userId: string,
    public readonly title: string,
    public readonly mediaType: MediaType,
    public readonly rating: number,
    public readonly positivePoints: string,
    public readonly negativePoints: string
  ) {
    if (!title.trim()) {
      throw new Error("O título é obrigatório")
    }

    if (rating < 0 || rating > 10) {
      throw new Error("A nota deve estar entre 0 e 10")
    }

    if (!positivePoints.trim()) {
      throw new Error("Os pontos positivos são obrigatórios")
    }

    if (!negativePoints.trim()) {
      throw new Error("Os pontos negativos são obrigatórios")
    }
  }
}