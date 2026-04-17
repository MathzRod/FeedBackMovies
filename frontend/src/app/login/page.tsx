
import { StarfieldBackground } from "@/components/ui/StarfieldBackground";
import LoginForm from "@/features/auth/components/loginForm";

export default function LoginPage() {
  return (
    <StarfieldBackground>
      <main className="w-screen h-screen  flex items-center justify-center">
          <LoginForm />
      </main>
    </StarfieldBackground>
  )
} 