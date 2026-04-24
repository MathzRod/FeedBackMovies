import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.BACKEND_URL

type RouteParams = {
  params: Promise<{
    id: string
  }>
}

// Esse arquivo cuida das ações em uma review específica.
// O [id] vem da própria URL.
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params
  const cookie = request.headers.get("cookie")

  const response = await fetch(`${BACKEND_URL}/reviews/${id}`, {
    method: "DELETE",
    headers: {
      cookie: cookie || "",
    },
  })

  const data = await response.json()

  return NextResponse.json(data, {
    status: response.status,
  })
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params
  const cookie = request.headers.get("cookie")
  const body = await request.json()

  const response = await fetch(`${BACKEND_URL}/reviews/${id}`, {
    method: "PUT",
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
