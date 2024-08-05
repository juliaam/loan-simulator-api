import express from "express";
import { Request, Response } from "express";
import loanRouter from "../src/features/loan/routes/loan.route";

const app = express();
app.use(express.json());

// remover
app.get("/", (req: Request, res: Response) => {
  return res.status(200).json("Olá Mundo! Essa é a minha primeira rota :)");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor está executando na porta ${PORT}`);
});

// routes

app.use("api/loan", loanRouter);

export default app;
