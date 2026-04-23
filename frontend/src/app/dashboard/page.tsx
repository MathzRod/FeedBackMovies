"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { StarfieldBackground } from "@/components/ui/StarfieldBackground"
import MainContent from "@/features/auth/components/MainContents"

// Esse arquivo decide se o usuario pode ou nao ver o dashboard.
// O card principal foi deixado em outro componente para ficar mais facil de manter.

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [loading, isAuthenticated, router])

  async function handleLogout() {
    await logout()
    router.push("/login")
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </main>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <StarfieldBackground>
      <main className="min-h-screen w-full flex justify-center px-4 py-8 sm:py-10">
        <MainContent
          email={user.email}
          role={user.role}
          onLogout={handleLogout}
        />
      </main>
    </StarfieldBackground>
  )
}
