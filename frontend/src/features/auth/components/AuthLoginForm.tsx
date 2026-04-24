"use client"

import { Inputs } from "@/components/ui/Input"
import AuthCard from "@/features/auth/components/AuthCard"
import AuthLinkRow from "@/features/auth/components/AuthLinkRow"
import GoogleAuthButton from "@/features/auth/components/GoogleAuthButton"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

// Esse componente cuida só do formulário de login.
// A página /login só monta o fundo e centraliza o card.
export default function AuthLoginForm() {
  const router = useRouter()
  const { refreshUser } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [erro, setErro] = useState("")
  const [sucesso, setSucesso] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    setErro("")
    setSucesso("")

    try {
      setLoading(true)

      // A chamada vai para a rota do Next, e ela conversa com o backend.
      const response = await fetch("/api/session/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setErro(data.error || "Erro ao realizar login")
        return
      }

      // Atualiza o contexto para o resto da aplicação saber que houve login.
      await refreshUser()

      setSucesso(`Bem-vindo, ${data.user.name || data.user.email}!`)

      setTimeout(() => {
        router.push("/dashboard")
      }, 1200)
    } catch {
      setErro("Não foi possível conectar ao servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard>
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

        {erro && <p className="text-sm text-red-500 text-center">{erro}</p>}
        {sucesso && <p className="text-sm text-green-600 text-center">{sucesso}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-zinc-800 h-12 rounded-lg
              text-zinc-100 text-sm font-bold
              hover:bg-black transition-colors duration-500
              disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <AuthLinkRow
          text="Não tem uma conta?"
          href="/signup"
          linkLabel="Cadastre-se"
        />

        <span className="text-zinc-900 text-sm text-center">Ou entre com</span>

        <GoogleAuthButton label="Entrar com Google" />
      </form>
    </AuthCard>
  )
}
