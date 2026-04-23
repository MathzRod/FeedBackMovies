"use client"

import { AuthContextProvider } from "@/contexts/AuthContext"

// Esse arquivo existe para deixar o layout mais limpo.
// O provider real esta em src/contexts/AuthContext.tsx.
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthContextProvider>{children}</AuthContextProvider>
}
