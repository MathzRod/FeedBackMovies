"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { StarfieldBackground } from "@/components/ui/StarfieldBackground"
import AuthLoginForm from "@/features/auth/components/AuthLoginForm"
import { useAuth } from "@/contexts/AuthContext"

// Página de entrada da autenticação.
// Se o usuário já estiver logado, vai direto para o dashboard.
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
      <main className="min-h-screen w-full flex items-center justify-center px-4 py-8">
        <AuthLoginForm />
      </main>
    </StarfieldBackground>
  )
}
