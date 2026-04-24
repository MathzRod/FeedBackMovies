"use client"

import { Inputs } from "@/components/ui/Input"
import AuthCard from "@/features/auth/components/AuthCard"
import AuthLinkRow from "@/features/auth/components/AuthLinkRow"
import GoogleAuthButton from "@/features/auth/components/GoogleAuthButton"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

// Esse componente monta o formulário de cadastro.
// Quando o cadastro dá certo, o usuário volta para a tela de login.
export default function SignUpForm() {
  const router = useRouter()

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmar, setConfirmar] = useState("")
  const [erroConfirmar, setErroConfirmar] = useState("")
  const [erroGeral, setErroGeral] = useState("")
  const [sucesso, setSucesso] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    setErroConfirmar("")
    setErroGeral("")
    setSucesso("")

    if (senha !== confirmar) {
      setErroConfirmar("As senhas não coincidem")
      return
    }

    try {
      setLoading(true)

      // Cadastro vai direto para o backend porque ainda não precisamos salvar cookie aqui.
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nome,
          email,
          password: senha,
          confirmPassword: confirmar,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setErroGeral(data.error || "Erro ao criar conta")
        return
      }

      setSucesso("Conta criada com sucesso! Redirecionando...")

      // Espera um pouco para dar tempo de ler a mensagem.
      setTimeout(() => {
        router.push("/login")
      }, 1200)
    } catch {
      setErroGeral("Não foi possível conectar ao servidor")
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
          id="signup-nome"
          label="Nome"
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          autoComplete="name"
        />

        <Inputs
          id="signup-email"
          label="Email"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <Inputs
          id="signup-senha"
          label="Senha"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value)
            if (erroConfirmar) setErroConfirmar("")
          }}
          autoComplete="new-password"
        />

        <Inputs
          id="signup-confirmar"
          label="Confirmar senha"
          type="password"
          placeholder="Confirmar senha"
          value={confirmar}
          error={erroConfirmar}
          onChange={(e) => {
            setConfirmar(e.target.value)
            if (erroConfirmar) setErroConfirmar("")
          }}
          autoComplete="new-password"
        />

        {erroGeral && (
          <p className="text-sm text-red-500 text-center">{erroGeral}</p>
        )}

        {sucesso && (
          <p className="text-sm text-green-600 text-center">{sucesso}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-zinc-800 h-12 rounded-lg
              text-zinc-100 text-sm font-bold
              hover:bg-black transition-colors duration-500
              disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Criando conta..." : "Criar conta"}
        </button>

        <AuthLinkRow
          text="Já tem uma conta?"
          href="/login"
          linkLabel="Entrar"
        />

        <span className="text-zinc-900 text-sm text-center">
          Ou cadastre-se com
        </span>

        <GoogleAuthButton label="Continuar com Google" />
      </form>
    </AuthCard>
  )
}
