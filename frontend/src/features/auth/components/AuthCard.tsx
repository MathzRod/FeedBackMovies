"use client"

import Image from "next/image"

type AuthCardProps = {
  children: React.ReactNode
}

// Esse card é a base visual de login e cadastro.
// Se o visual dessas duas páginas mudar, o ajuste principal fica aqui.
export default function AuthCard({ children }: AuthCardProps) {
  return (
    <section className="w-full max-w-xl glass-card flex flex-col items-center justify-start rounded-lg gap-8 px-4 py-8 sm:px-6 md:px-8">
      <div className="w-50 h-50">
        <Image
          src="/darthVader.png"
          alt="Logo do FeedBackMovies"
          width={200}
          height={200}
          className="object-contain"
          loading="eager"
        />
      </div>

      {children}
    </section>
  )
}
