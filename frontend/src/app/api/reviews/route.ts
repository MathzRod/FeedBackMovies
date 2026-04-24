import { NextRequest, NextResponse } from "next/server"

function getBackendUrl() {
  const backendUrl = process.env.BACKEND_URL

  if (!backendUrl) {
    throw new Error("BACKEND_URL não configurada")
  }

  return backendUrl
}

async function readResponse(response: Response) {
  const text = await response.text()

  if (!text) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    return { error: text }
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookie = request.headers.get("cookie")
    const backendUrl = getBackendUrl()

    const response = await fetch(`${backendUrl}/reviews`, {
      method: "GET",
      headers: {
        cookie: cookie || "",
      },
    })

    const data = await readResponse(response)

    return NextResponse.json(data, {
      status: response.status,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao buscar avaliações",
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const cookie = request.headers.get("cookie")
    const backendUrl = getBackendUrl()

    const response = await fetch(`${backendUrl}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookie || "",
      },
      body: JSON.stringify(body),
    })

    const data = await readResponse(response)

    return NextResponse.json(data, {
      status: response.status,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao salvar avaliação",
      },
      { status: 500 }
    )
  }
}