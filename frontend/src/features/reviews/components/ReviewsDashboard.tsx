"use client"

import ReviewForm from "@/features/reviews/components/ReviewForm"
import ReviewList from "@/features/reviews/components/ReviewList"
import { ReviewItem, SelectedMedia } from "@/features/reviews/types"
import { useEffect, useState } from "react"

type ReviewsDashboardProps = {
  email: string
  role: string
  onLogout: () => Promise<void>
}

// Esse é o componente principal da tela de dashboard.
// Ele junta o formulário, a lista e o controle de edição.
export default function ReviewsDashboard({
  email,
  role,
  onLogout,
}: ReviewsDashboardProps) {
  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia | null>(null)
  const [rating, setRating] = useState(0)
  const [positives, setPositives] = useState("")
  const [negatives, setNegatives] = useState("")
  const [error, setError] = useState("")
  const [reviews, setReviews] = useState<ReviewItem[]>([])
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null)

  function resetForm() {
    setSelectedMedia(null)
    setRating(0)
    setPositives("")
    setNegatives("")
    setEditingReviewId(null)
  }

  async function loadReviews() {
    try {
      const response = await fetch("/api/reviews", {
        credentials: "include",
      })

      const data = await response.json()

      if (!response.ok) {
        setReviews([])
        return
      }

      setReviews(data)
    } catch {
      setReviews([])
    }
  }

  useEffect(() => {
    loadReviews()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!selectedMedia) {
      setError("Selecione um filme ou série.")
      return
    }

    if (rating < 0.5 || rating > 5) {
      setError("Selecione uma nota válida.")
      return
    }

    if (!positives.trim() || !negatives.trim()) {
      setError("Preencha os pontos positivos e negativos.")
      return
    }

    try {
      const isEditing = !!editingReviewId

      const response = await fetch(
        isEditing ? `/api/reviews/${editingReviewId}` : "/api/reviews",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(
            isEditing
              ? {
                  rating,
                  positives,
                  negatives,
                }
              : {
                  tmdbId: selectedMedia.id,
                  title: selectedMedia.title,
                  mediaType: selectedMedia.mediaType,
                  posterUrl: selectedMedia.posterUrl,
                  year: selectedMedia.year,
                  rating,
                  positives,
                  negatives,
                }
          ),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao salvar avaliação")
      }

      resetForm()
      await loadReviews()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Erro inesperado")
      }
    }
  }

  function handleEdit(review: ReviewItem) {
    setEditingReviewId(review.id)

    setSelectedMedia({
      id: review.tmdbId || 0,
      title: review.title,
      mediaType: review.mediaType,
      posterUrl: review.posterUrl || null,
      year: review.year || "",
    })

    setRating(review.rating)
    setPositives(review.positives)
    setNegatives(review.negatives)

    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm("Deseja excluir esta avaliação?")

    if (!confirmDelete) return

    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao excluir avaliação")
      }

      await loadReviews()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Erro inesperado")
      }
    }
  }

  function handleCancelEdit() {
    setError("")
    resetForm()
  }

  return (
    <section className="w-full max-w-5xl rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md shadow-2xl">
      <div className="flex flex-col gap-6 p-4 sm:p-6 md:p-8">
        <header className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Avalie seu Filme ou Série
          </h1>

          <p className="text-sm sm:text-base text-white/80">
            Bem-vindo ao painel do FeedBackMovies!
          </p>

          <div className="text-sm text-white/70">
            <p>{email}</p>
            <p>Perfil: {role}</p>
          </div>
        </header>

        <ReviewForm
          editingReviewId={editingReviewId}
          selectedMedia={selectedMedia}
          onSelectedMediaChange={setSelectedMedia}
          rating={rating}
          onRatingChange={setRating}
          positives={positives}
          onPositivesChange={setPositives}
          negatives={negatives}
          onNegativesChange={setNegatives}
          error={error}
          onSubmit={handleSubmit}
          onCancelEdit={handleCancelEdit}
        />

        <ReviewList
          reviews={reviews}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

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
