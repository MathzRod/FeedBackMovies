import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = "http://localhost:3333"

// Essa rota só faz a ponte entre o App Router e o backend de reviews.
export async function GET(request: NextRequest) {
  const cookie = request.headers.get("cookie")

  const response = await fetch(`${BACKEND_URL}/reviews`, {
    method: "GET",
    headers: {
      cookie: cookie || "",
    },
  })

  const data = await response.json()

  return NextResponse.json(data, {
    status: response.status,
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const cookie = request.headers.get("cookie")

  const response = await fetch(`${BACKEND_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: cookie || "",
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()

  return NextResponse.json(data, {
    status: response.status,
  })
}
