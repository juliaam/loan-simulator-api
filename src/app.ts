import express from "express";
import loanRouter from "../src/features/loan/routes/loan.route";

const app = express();
app.use(express.json());

// routes
app.use("/api/loan", loanRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor está executando na porta ${PORT}`);
});

export default app;
