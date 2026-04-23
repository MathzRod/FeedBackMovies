"use client"

import Stars from "@/components/ui/Stars"
import { useState } from "react"

type MainContentProps = {
  email: string
  role: string
  onLogout: () => Promise<void>
}

type ReviewItem = {
  id: string
  title: string
  mediaType: "movie" | "tv"
  rating: number
  positives: string
  negatives: string
}

// Esse e o card principal do dashboard.
// As avaliacoes ficam em memoria por enquanto, sem salvar no backend.
export default function MainContent({
  email,
  role,
  onLogout,
}: MainContentProps) {
  const [title, setTitle] = useState("")
  const [mediaType, setMediaType] = useState<"movie" | "tv">("movie")
  const [rating, setRating] = useState(0)
  const [positives, setPositives] = useState("")
  const [negatives, setNegatives] = useState("")
  const [error, setError] = useState("")
  const [reviews, setReviews] = useState<ReviewItem[]>([])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    // Validacoes simples antes de criar a avaliacao.
    if (!title.trim()) {
      setError("Digite o nome do filme ou sÃ©rie.")
      return
    }

    if (rating < 0 || rating > 5) {
      setError("A nota deve estar entre 0 e 5.")
      return
    }

    if (!positives.trim() || !negatives.trim()) {
      setError("Preencha os pontos positivos e negativos.")
      return
    }

    const newReview: ReviewItem = {
      id: crypto.randomUUID(),
      title,
      mediaType,
      rating,
      positives,
      negatives,
    }

    // Colocamos a nova avaliacao no topo para ela aparecer primeiro.
    setReviews((prev) => [newReview, ...prev])

    setTitle("")
    setMediaType("movie")
    setRating(0)
    setPositives("")
    setNegatives("")
  }

  return (
    <section className="w-full max-w-5xl rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md shadow-2xl">
      <div className="flex flex-col gap-6 p-4 sm:p-6 md:p-8">
        <header className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Avalie seu Filme ou SÃ©rie
          </h1>

          <p className="text-sm sm:text-base text-white/80">
            Bem-vindo ao painel do FeedBackMovies!
          </p>

          <div className="text-sm text-white/70">
            <p>{email}</p>
            <p>Perfil: {role}</p>
          </div>
        </header>

        <div className="rounded-xl border border-white/10 bg-black/20 p-4 sm:p-5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm font-medium text-white">
                Nome do filme ou sÃ©rie
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Interestelar"
                className="w-full rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-white/40 outline-none"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="mediaType" className="text-sm font-medium text-white">
                  Tipo
                </label>
                <select
                  id="mediaType"
                  value={mediaType}
                  onChange={(e) => setMediaType(e.target.value as "movie" | "tv")}
                  className="w-full rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-white outline-none"
                >
                  <option value="movie" className="text-black">
                    Filme
                  </option>
                  <option value="tv" className="text-black">
                    SÃ©rie
                  </option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-white">
                  Sua nota
                </span>

                <Stars value={rating} onChange={setRating} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="positives" className="text-sm font-medium text-white">
                Pontos positivos
              </label>
              <textarea
                id="positives"
                value={positives}
                onChange={(e) => setPositives(e.target.value)}
                placeholder="O que vocÃª gostou?"
                className="min-h-32 w-full rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-white/40 outline-none resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="negatives" className="text-sm font-medium text-white">
                Pontos negativos
              </label>
              <textarea
                id="negatives"
                value={negatives}
                onChange={(e) => setNegatives(e.target.value)}
                placeholder="O que vocÃª nÃ£o gostou?"
                className="min-h-32 w-full rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-white/40 outline-none resize-none"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              className="h-12 rounded-lg bg-white text-zinc-900 text-sm font-bold hover:bg-zinc-100 transition-colors duration-200"
            >
              Salvar avaliaÃ§Ã£o
            </button>
          </form>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-4 sm:p-5">
          <h2 className="mb-4 text-lg sm:text-xl font-semibold text-white">
            AvaliaÃ§Ãµes enviadas
          </h2>

          {reviews.length === 0 ? (
            <p className="text-sm text-white/70">
              Nenhuma avaliaÃ§Ã£o cadastrada ainda.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {review.title}
                      </h3>
                      <p className="text-sm text-white/70">
                        {review.mediaType === "movie" ? "Filme" : "SÃ©rie"}
                      </p>
                    </div>

                    <div className="rounded-md bg-white/10 px-3 py-1 text-sm font-semibold text-white">
                      {review.rating}/5
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-semibold text-green-300">
                        Pontos positivos
                      </h4>
                      <p className="mt-1 text-sm text-white/80">
                        {review.positives}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-red-300">
                        Pontos negativos
                      </h4>
                      <p className="mt-1 text-sm text-white/80">
                        {review.negatives}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="h-12 rounded-lg bg-zinc-800 text-zinc-100 text-sm font-bold hover:bg-zinc-700/80 transition-colors duration-200"
        >
          Sair
        </button>
      </div>
    </section>
  )
}
