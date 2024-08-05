import express from "express";
import { Request, Response } from "express";
import loanRouter from "../src/features/loan/routes/loan.route";
import { loanController } from "../src/features/loan/controllers/loan.controller";

const app = express();
app.use(express.json());

// remover
app.get("/api", (req: Request, res: Response) => {
  return res.status(200).json("Olá Mundo! Essa é a minha primeira rota :)");
});

// routes
app.use("/api/loan", loanRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor está executando na porta ${PORT}`);
});

export default app;
