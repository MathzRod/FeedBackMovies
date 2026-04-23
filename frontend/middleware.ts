import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")

  const isAuthPage =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup"

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/dashboard")

  // Se nao tiver sessao e tentar abrir o dashboard, volta para o login.
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Se ja estiver logado, nao faz sentido voltar para login ou cadastro.
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  // O middleware so roda nessas rotas.
  matcher: ["/dashboard/:path*", "/login", "/signup"],
}
