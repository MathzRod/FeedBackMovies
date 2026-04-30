"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = require("./routes/auth.routes");
const review_routes_1 = require("./routes/review.routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Configurações básicas para o frontend conseguir falar com o backend.
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        process.env.FRONTEND_URL || "",
    ],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Rota simples só para saber se o servidor subiu.
app.get("/health", (_req, res) => {
    res.status(200).json({ message: "Backend funcionando" });
});
// Cada grupo de rota fica separado por assunto.
app.use("/auth", auth_routes_1.authRoutes);
app.use("/reviews", review_routes_1.reviewRoutes);
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
