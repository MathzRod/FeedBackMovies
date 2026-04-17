import Link from "next/link"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-100">
      <div className="mx-auto max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
        <h1 className="text-2xl font-bold text-white">FeedBackMovies</h1>
        <p className="mt-2 text-zinc-400">
          Página de exemplo (somente layout, sem autenticação).
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/login"
            className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-white"
          >
            Ir para login
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-zinc-600 px-4 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-800"
          >
            Início
          </Link>
        </div>
      </div>
    </main>
  )
}
