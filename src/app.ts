import express from "express";
import loanRouter from "../src/features/loan/routes/loan.route";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";

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

interface LoanAttributes {
  id: number;
  cpf: string;
  uf: "mg" | "sp" | "rj" | "es";
  birth: string;
  total_value: number;
  month_value: number;
}

interface LoanCreationAttributes extends Optional<LoanAttributes, "id"> {}

// Definição do Modelo Loan
class Loan
  extends Model<LoanAttributes, LoanCreationAttributes>
  implements LoanAttributes
{
  public id!: number;
  public cpf!: string;
  public uf!: "mg" | "sp" | "rj" | "es";
  public birth!: string;
  public total_value!: number;
  public month_value!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Loan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uf: {
      type: DataTypes.ENUM("mg", "sp", "rj", "es"),
      allowNull: false,
    },
    birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total_value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    month_value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize, // Instância do Sequelize
    tableName: "loans",
    timestamps: true,
  }
);

// Função para criar um empréstimo
const createLoan = async (data: LoanAttributes) => {
  try {
    const loan = await Loan.create(data);
    return loan;
  } catch (error) {
    throw new Error(`Error creating loan: ${error}`);
  }
};

// Função de exemplo para uso em um controlador
const createLoanController = async (req: any, res: any) => {
  try {
    const loanData: LoanAttributes = req.body;
    const loan = await createLoan(loanData);
    res.status(201).json(loan);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const app = express();
app.use(express.json());

app.post("/api/loan/sequelize", createLoanController);
// routes
app.use("/api/loan", loanRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor está executando na porta ${PORT}`);
});

export default app;
