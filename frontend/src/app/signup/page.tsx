import { StarfieldBackground } from "@/components/ui/StarfieldBackground"
import SignUpForm from "@/features/auth/components/SignUpForm"

export default function SignUpPage() {
  return (
    <StarfieldBackground>
      <main className="w-screen h-screen flex items-center justify-center">
        <SignUpForm />
      </main>
    </StarfieldBackground>
  )
}
