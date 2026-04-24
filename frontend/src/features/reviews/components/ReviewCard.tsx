"use client"

import { ReviewItem } from "@/features/reviews/types"
import Image from "next/image"
import { MdModeEdit, MdOutlineDeleteForever } from "react-icons/md"

type ReviewCardProps = {
  review: ReviewItem
  onEdit: (review: ReviewItem) => void
  onDelete: (id: string) => void
}

// Esse card mostra uma única avaliação da lista.
// Se o visual de cada item mudar, o ajuste principal vai ser feito aqui.
export default function ReviewCard({
  review,
  onEdit,
  onDelete,
}: ReviewCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
        <div className="self-center h-36 w-24 shrink-0 overflow-hidden rounded-lg bg-white/10">
          {review.posterUrl ? (
            <Image
              src={review.posterUrl}
              alt={review.title}
              width={96}
              height={144}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-white/40">
              sem capa
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">
                {review.title}
              </h3>

              <p className="text-sm text-white/70">
                {review.year || "Sem ano"} -{" "}
                {review.mediaType === "movie" ? "Filme" : "Série"}
              </p>
            </div>

            <div className="rounded-md bg-white/10 px-3 py-1 text-sm font-semibold text-white">
              {review.rating}/5
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
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

              <div className="mt-4 flex justify-center items-center gap-3">
                <button
                  type="button"
                  onClick={() => onEdit(review)}
                  className="rounded-lg bg-white/10 px-4 py-2 text-2xl font-semibold text-white hover:bg-white/20"
                >
                  <MdModeEdit />
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(review.id)}
                  className="rounded-lg bg-red-500/20 px-4 py-2 text-2xl font-semibold text-red-200 hover:bg-red-500/30"
                >
                  <MdOutlineDeleteForever />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
