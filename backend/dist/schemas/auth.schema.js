"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z
    .object({
    name: zod_1.z
        .string()
        .min(3, "O nome deve ter pelo menos 3 caracteres")
        .trim(),
    email: zod_1.z
        .string()
        .email("Informe um email válido")
        .trim()
        .toLowerCase(),
    password: zod_1.z
        .string()
        .min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: zod_1.z
        .string()
        .min(6, "A confirmação de senha deve ter pelo menos 6 caracteres"),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email("Informe um email válido")
        .trim()
        .toLowerCase(),
    password: zod_1.z
        .string()
        .min(6, "A senha deve ter pelo menos 6 caracteres"),
});
