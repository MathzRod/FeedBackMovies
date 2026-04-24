"use client"

import Stars from "@/components/ui/Stars"
import MovieAutocomplete from "@/features/reviews/components/MovieAutocomplete"
import { SelectedMedia } from "@/features/reviews/types"
import Image from "next/image"

type ReviewFormProps = {
  editingReviewId: string | null
  selectedMedia: SelectedMedia | null
  onSelectedMediaChange: (media: SelectedMedia | null) => void
  rating: number
  onRatingChange: (value: number) => void
  positives: string
  onPositivesChange: (value: string) => void
  negatives: string
  onNegativesChange: (value: string) => void
  error: string
  onSubmit: (event: React.FormEvent) => Promise<void>
  onCancelEdit: () => void
}

// Esse componente mostra o formulário de criar ou editar review.
// Quando existe editingReviewId, a tela entra no modo de edição.
export default function ReviewForm({
  editingReviewId,
  selectedMedia,
  onSelectedMediaChange,
  rating,
  onRatingChange,
  positives,
  onPositivesChange,
  negatives,
  onNegativesChange,
  error,
  onSubmit,
  onCancelEdit,
}: ReviewFormProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4 sm:p-5">
      {editingReviewId && (
        <p className="text-sm text-yellow-300 text-center">
          Você está editando uma avaliação
        </p>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-white">
            Nome do filme ou série
          </label>

          <MovieAutocomplete
            value={selectedMedia}
            onChange={onSelectedMediaChange}
          />
        </div>

        {selectedMedia && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex gap-4">
              <div className="h-28 w-20 shrink-0 overflow-hidden rounded-lg bg-white/10">
                {selectedMedia.posterUrl ? (
                  <Image
                    src={selectedMedia.posterUrl}
                    alt={selectedMedia.title}
                    width={80}
                    height={112}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-white/40">
                    sem capa
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center">
                <h3 className="text-base font-bold text-white">
                  {selectedMedia.title}
                </h3>

                <p className="text-sm text-white/70">
                  {selectedMedia.year || "Sem ano"} -{" "}
                  {selectedMedia.mediaType === "movie" ? "Filme" : "Série"}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-white">
            Sua nota
          </span>

          <div className="flex justify-around">
            <Stars value={rating} onChange={onRatingChange} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="positives"
            className="text-sm font-medium text-white"
          >
            Pontos positivos
          </label>

          <textarea
            id="positives"
            value={positives}
            onChange={(e) => onPositivesChange(e.target.value)}
            placeholder="O que você gostou?"
            className="min-h-32 w-full rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-white/40 outline-none resize-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="negatives"
            className="text-sm font-medium text-white"
          >
            Pontos negativos
          </label>

          <textarea
            id="negatives"
            value={negatives}
            onChange={(e) => onNegativesChange(e.target.value)}
            placeholder="O que você não gostou?"
            className="min-h-32 w-full rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-white/40 outline-none resize-none"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 h-12 rounded-lg bg-white text-zinc-900 text-sm font-bold hover:bg-zinc-100 transition-colors duration-200"
          >
            {editingReviewId ? "Atualizar avaliação" : "Salvar avaliação"}
          </button>

          {editingReviewId && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="h-12 px-4 rounded-lg bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors duration-200"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
