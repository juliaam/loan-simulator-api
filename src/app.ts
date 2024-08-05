import express from "express";
import loanRouter from "../src/features/loan/routes/loan.route";

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgresql://tododb_owner:oydwhK9V1nFX@ep-wild-truth-a5ncxzy2.us-east-2.aws.neon.tech/loan_teste?sslmode=require"
);
const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connect();

const app = express();
app.use(express.json());

// routes
app.use("/api/loan", loanRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor está executando na porta ${PORT}`);
});

export default app;
