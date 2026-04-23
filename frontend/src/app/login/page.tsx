"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { StarfieldBackground } from "@/components/ui/StarfieldBackground"
import LoginForm from "@/features/auth/components/loginForm"
import { useAuth } from "@/contexts/AuthContext"

// Pagina de entrada da autenticacao.
// Se o usuario ja estiver logado, a gente manda ele para o dashboard.
export default function LoginPage() {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [loading, isAuthenticated, router])

  if (loading) {
    return null
  }

  return (
    <StarfieldBackground>
      <main className="w-screen h-screen flex items-center justify-center">
        <LoginForm />
      </main>
    </StarfieldBackground>
  )
}
