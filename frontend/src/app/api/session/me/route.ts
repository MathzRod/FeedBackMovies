import { NextRequest, NextResponse } from "next/server"

// Essa rota pergunta ao backend quem é o usuário atual.
// Ela só reaproveita o cookie que já chegou do navegador.
export async function GET(request: NextRequest) {
  const cookie = request.headers.get("cookie")
  const backendUrl = process.env.BACKEND_URL

  const response = await fetch(`${backendUrl}/auth/me`, {
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
