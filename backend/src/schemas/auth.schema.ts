import { z } from "zod"

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "O nome deve ter pelo menos 3 caracteres")
      .trim(),
    email: z
      .string()
      .email("Informe um email válido")
      .trim()
      .toLowerCase(),
    password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "A confirmação de senha deve ter pelo menos 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })

export const loginSchema = z.object({
  email: z
    .string()
    .email("Informe um email válido")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
})

export type RegisterSchemaData = z.infer<typeof registerSchema>
export type LoginSchemaData = z.infer<typeof loginSchema>
