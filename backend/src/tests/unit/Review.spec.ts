import { Review } from "../../domain/entities/Review"

describe("Review Entity", () => {
  it("deve criar uma review válida", () => {
    const review = new Review(
      "user-1",
      "Batman",
      "movie",
      9,
      "Visual incrível",
      "Filme um pouco longo"
    )

    expect(review.title).toBe("Batman")
    expect(review.rating).toBe(9)
    expect(review.mediaType).toBe("movie")
  })

  it("não deve permitir nota maior que 10", () => {
    expect(() => {
      new Review(
        "user-1",
        "Batman",
        "movie",
        11,
        "Visual incrível",
        "Filme um pouco longo"
      )
    }).toThrow("A nota deve estar entre 0 e 10")
  })

  it("não deve permitir título vazio", () => {
    expect(() => {
      new Review(
        "user-1",
        "",
        "movie",
        8,
        "Bom",
        "Longo"
      )
    }).toThrow("O título é obrigatório")
  })
})