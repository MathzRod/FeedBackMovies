"use client"

import { SelectedMedia } from "@/features/reviews/types"
import Image from "next/image"
import { useEffect, useState } from "react"

type MovieAutocompleteProps = {
  value: SelectedMedia | null
  onChange: (media: SelectedMedia | null) => void
}

// Esse componente faz a busca do filme ou série enquanto a pessoa digita.
// Quando o item é escolhido, ele devolve o objeto inteiro para o formulário.
export default function MovieAutocomplete({
  value,
  onChange,
}: MovieAutocompleteProps) {
  const [query, setQuery] = useState(value?.title || "")
  const [results, setResults] = useState<SelectedMedia[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (value) {
      setQuery(value.title)
    }
  }, [value])

  useEffect(() => {
    if (query.trim().length < 2 || value?.title === query) {
      setResults([])
      return
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true)

        const response = await fetch(
          `/api/movies/search?query=${encodeURIComponent(query)}`
        )

        const data = await response.json()

        if (!response.ok) {
          setResults([])
          return
        }

        setResults(data.results || [])
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 400)

    return () => clearTimeout(timeout)
  }, [query, value])

  function handleSelect(media: SelectedMedia) {
    onChange(media)
    setQuery(media.title)
    setResults([])
  }

  function handleClear() {
    onChange(null)
    setQuery("")
    setResults([])
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          onChange(null)
        }}
        placeholder="Digite o nome do filme ou série..."
        className="w-full rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-white/40 outline-none"
      />

      {loading && (
        <p className="mt-1 text-xs text-white/60">Buscando...</p>
      )}

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="mt-2 text-xs text-white/60 hover:text-white"
        >
          Limpar seleção
        </button>
      )}

      {results.length > 0 && (
        <div className="absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-white/10 bg-zinc-950 shadow-2xl">
          {results.map((item) => (
            <button
              key={`${item.mediaType}-${item.id}`}
              type="button"
              onClick={() => handleSelect(item)}
              className="flex w-full items-center gap-3 px-3 py-3 text-left hover:bg-white/10"
            >
              <div className="h-16 w-11 shrink-0 overflow-hidden rounded bg-white/10">
                {item.posterUrl ? (
                  <Image
                    src={item.posterUrl}
                    alt={item.title}
                    width={44}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-white/40">
                    sem capa
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {item.title}
                </p>
                <p className="text-xs text-white/60">
                  {item.year || "Sem ano"} -{" "}
                  {item.mediaType === "movie" ? "Filme" : "Série"}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
