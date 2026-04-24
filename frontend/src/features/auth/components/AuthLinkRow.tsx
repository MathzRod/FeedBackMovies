"use client"

import Link from "next/link"

type AuthLinkRowProps = {
  text: string
  href: string
  linkLabel: string
}

// Esse componente mostra a frase com o link entre login e cadastro.
// Ele existe só para não repetir o mesmo bloco nas duas telas.
export default function AuthLinkRow({
  text,
  href,
  linkLabel,
}: AuthLinkRowProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3">
      <span className="text-black text-sm">{text}</span>

      <Link href={href} className="text-black font-bold">
        {linkLabel}
      </Link>
    </div>
  )
}
