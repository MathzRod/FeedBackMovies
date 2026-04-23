import { NextRequest, NextResponse } from "next/server"

type TMDBMediaType = "movie" | "tv" | "person"

type TMDBItem = {
  id: number
  media_type: TMDBMediaType
  title?: string
  name?: string
  original_title?: string
  original_name?: string
  release_date?: string
  first_air_date?: string
  poster_path?: string | null
  overview?: string
}

type TMDBSearchResponse = {
  results: TMDBItem[]
  status_message?: string
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query")?.trim()

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] })
  }

  const token = process.env.TMDB_API_TOKEN

  if (!token) {
    return NextResponse.json(
      { error: "TMDB_API_TOKEN não configurado" },
      { status: 500 }
    )
  }

  const tmdbResponse = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&language=pt-BR&page=1&include_adult=false`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  )

  const data: TMDBSearchResponse = await tmdbResponse.json()

  if (!tmdbResponse.ok) {
    return NextResponse.json(
      { error: data.status_message || "Erro ao buscar no TMDB" },
      { status: tmdbResponse.status }
    )
  }

  const imageBaseUrl =
    process.env.TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p/w92"

  const results = (data.results || [])
    .filter(
      (item: TMDBItem) =>
        item.media_type === "movie" || item.media_type === "tv"
    )
    .slice(0, 8)
    .map((item: TMDBItem) => ({
      id: item.id,
      mediaType: item.media_type,
      title: item.title || item.name || "",
      originalTitle: item.original_title || item.original_name || "",
      year: (item.release_date || item.first_air_date || "").slice(0, 4),
      posterPath: item.poster_path || null,
      posterUrl: item.poster_path
        ? `${imageBaseUrl}${item.poster_path}`
        : null,
      overview: item.overview || "",
    }))

  return NextResponse.json({ results })
}