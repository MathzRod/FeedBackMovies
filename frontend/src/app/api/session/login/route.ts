import { NextRequest, NextResponse } from "next/server"

// Essa rota recebe o login do frontend, chama o backend
// e grava os cookies usados pela sessão no navegador.
export async function POST(request: NextRequest) {
  const body = await request.json()

  const response = await fetch("http://localhost:3333/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()

  if (!response.ok) {
    return NextResponse.json(
      { error: data.error || "Erro ao realizar login" },
      { status: response.status }
    )
  }

  const res = NextResponse.json({
    message: "Login realizado com sucesso",
    user: data.user,
  })

  // "session" é um marcador simples usado pelo middleware.
  res.cookies.set("session", "true", {
    httpOnly: true,
    path: "/",
  })

  // O token vai para o backend quando precisarmos validar o usuário.
  res.cookies.set("token", data.token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: false,
    maxAge: 60 * 60 * 24,
  })

  return res
}
