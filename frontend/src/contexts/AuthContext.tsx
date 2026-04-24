"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

type User = {
  id: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  refreshUser: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Esse contexto guarda o usuário logado para o frontend inteiro.
// Assim login, cadastro e dashboard conseguem ler o mesmo estado.
export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    try {
      // Essa rota do Next só repassa os cookies para o backend
      // e devolve os dados do usuário autenticado.
      const response = await fetch("/api/session/me", {
        method: "GET",
        credentials: "include",
      })

      const data = await response.json()

      if (!response.ok) {
        setUser(null)
        return
      }

      setUser(data.user)
    } catch {
      setUser(null)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await fetch("/api/session/logout", {
        method: "POST",
        credentials: "include",
      })
    } finally {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    async function loadAuth() {
      // Quando a app abre, tentamos descobrir se já existe sessão salva.
      setLoading(true)
      await refreshUser()
      setLoading(false)
    }

    loadAuth()
  }, [refreshUser])

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      refreshUser,
      logout,
    }),
    [user, loading, refreshUser, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    // Esse erro ajuda quando esquecemos de envolver a app no provider.
    throw new Error("useAuth deve ser usado dentro de AuthContextProvider")
  }

  return context
}
