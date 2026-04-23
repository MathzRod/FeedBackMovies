import { NextRequest, NextResponse } from "next/server"

// Essa rota pergunta ao backend quem e o usuario atual.
// Ela so reaproveita o cookie que ja chegou do navegador.
export async function GET(request: NextRequest) {
  const cookie = request.headers.get("cookie")

  const response = await fetch("http://localhost:3333/auth/me", {
    method: "GET",
    headers: {
      cookie: cookie || "",
    },
  })

  const data = await response.json()

  if (!response.ok) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
  }

  return NextResponse.json(data)
}
