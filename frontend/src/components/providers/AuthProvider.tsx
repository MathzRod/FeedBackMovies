"use client"

import { AuthContextProvider } from "@/contexts/AuthContext"

// Esse arquivo existe só para o layout não ficar carregado.
// O provider de verdade está em src/contexts/AuthContext.tsx.
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthContextProvider>{children}</AuthContextProvider>
}
