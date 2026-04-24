import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const backendUrl = process.env.BACKEND_URL

  if (!backendUrl) {
    return NextResponse.json(
      { error: "BACKEND_URL não configurada" },
      { status: 500 }
    )
  }

  const response = await fetch(`${backendUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()

  return NextResponse.json(data, {
    status: response.status,
  })
}