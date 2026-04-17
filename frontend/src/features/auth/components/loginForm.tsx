"use client"

import { Inputs } from "@/components/ui/Input"
import Image from "next/image"
import Link from "next/link"
import { FormEvent, useState } from "react"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
  }

  return (
    <section className="w-screen mx-6 glass-card flex flex-col items-center justify-start rounded-lg gap-8 py-8">
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

      <form
        className="flex flex-col w-full px-7 gap-4"
        onSubmit={handleSubmit}
      >
        <Inputs
          id="login-email"
          label="Email"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <Inputs
          id="login-senha"
          label="Senha"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="bg-zinc-800 h-12 rounded-lg
              text-zinc-100 text-sm font-bold
              hover:bg-zinc-700/80 transition-colors duration-200"
        >
          Entrar
        </button>

        <div className="flex items-center justify-center">
          <span className="text-zinc-900 text-sm">Não tem uma conta?</span>
          <Link
            href="/signup"
            className="text-black font-bold hover:text-zinc-600 transition-colors duration-200 ml-1"
          >
            Cadastre-se
          </Link>
        </div>

        <span className="text-zinc-900 text-sm text-center">Ou entre com</span>

        <button
          type="button"
          className="
        w-full h-12 rounded-lg
        bg-white hover:bg-zinc-50
        text-black text-sm font-bold
        transition-all duration-200
        flex items-center justify-center gap-3
        active:scale-95
        border border-zinc-200 hover:border-zinc-300
        shadow-sm hover:shadow-md
      "
        >
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Entrar com Google
        </button>
      </form>
    </section>
  )
}
