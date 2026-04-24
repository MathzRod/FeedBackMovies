import { StarfieldBackground } from "@/components/ui/StarfieldBackground"
import SignUpForm from "@/features/auth/components/SignUpForm"

// Essa página só monta o fundo e centraliza o formulário de cadastro.
export default function SignUpPage() {
  return (
    <StarfieldBackground>
      <main className="min-h-screen w-full flex items-center justify-center px-4 py-8">
        <SignUpForm />
      </main>
    </StarfieldBackground>
  )
}
