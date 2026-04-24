import { NextRequest, NextResponse } from "next/server"

// Logout faz duas coisas:
// 1) avisa o backend
// 2) limpa os cookies que o frontend usa para sessão
export async function POST(request: NextRequest) {
  const cookie = request.headers.get("cookie")

  await fetch("http:/${process.env.BACKEND_URL}//auth/logout", {
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
