import { StarfieldBackground } from "@/components/ui/StarfieldBackground"
import SignUpForm from "@/features/auth/components/SignUpForm"

// Essa pagina so monta o fundo e centraliza o formulario de cadastro.
export default function SignUpPage() {
  return (
    <StarfieldBackground>
      <main className="w-screen h-screen flex items-center justify-center">
        <SignUpForm />
      </main>
    </StarfieldBackground>
  )
}
