import type { Metadata } from "next"
import "./globals.css"
import AuthProvider from "@/components/providers/AuthProvider"

export const metadata: Metadata = {
  title: "FeedBackMovies",
  description: "Projeto com autenticação",
}

// Esse layout envolve todas as páginas do app.
// Qualquer rota criada dentro de src/app passa por aqui.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
