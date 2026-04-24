"use client"

import ReviewCard from "@/features/reviews/components/ReviewCard"
import { ReviewItem } from "@/features/reviews/types"

type ReviewListProps = {
  reviews: ReviewItem[]
  onEdit: (review: ReviewItem) => void
  onDelete: (id: string) => void
}

// Essa parte mostra a lista de avaliações já criadas.
// Se a lista estiver vazia, exibe uma mensagem simples no lugar.
export default function ReviewList({
  reviews,
  onEdit,
  onDelete,
}: ReviewListProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4 sm:p-5">
      <h2 className="mb-4 text-lg sm:text-xl font-semibold text-white">
        Avaliações enviadas
      </h2>

      {reviews.length === 0 ? (
        <p className="text-sm text-white/70">
          Nenhuma avaliação cadastrada ainda.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
