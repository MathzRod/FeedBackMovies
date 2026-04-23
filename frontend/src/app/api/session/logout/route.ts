import { NextRequest, NextResponse } from "next/server"

// Logout limpa o lado do backend e tambem apaga os cookies do frontend.
export async function POST(request: NextRequest) {
  const cookie = request.headers.get("cookie")

  await fetch("http://localhost:3333/auth/logout", {
    method: "POST",
    headers: {
      cookie: cookie || "",
    },
  })

  const res = NextResponse.json({
    message: "Logout realizado",
  })

  res.cookies.set("session", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  })

  res.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
    sameSite: "lax",
    secure: false,
  })

  return res
}
