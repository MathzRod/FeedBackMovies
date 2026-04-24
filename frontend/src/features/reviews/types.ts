export type SelectedMedia = {
  id: number
  mediaType: "movie" | "tv"
  title: string
  year: string
  posterUrl: string | null
}

export type ReviewItem = {
  id: string
  title: string
  mediaType: "movie" | "tv"
  rating: number
  positives: string
  negatives: string
  tmdbId?: number | null
  posterUrl?: string | null
  year?: string | null
}
