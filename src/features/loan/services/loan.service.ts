import { createLoan } from "../repositorys/loan.repository";
import { ILoan } from "../controllers/loan.controller";

const interestPerState = {
  mg: 1,
  sp: 0.8,
  rj: 0.9,
  es: 1.11,
};

const ONE_PERCENT = 0.01;

const create = async (data: ILoan) => {
  const loan = await createLoan(data);
  return loan;
};

const simulate = async (data: ILoan) => {
  if (data.total_value < 50000) {
    throw new Error("Valor mínimo para empréstimo é de R$50.5000");
  }

  if (data.month_value < ONE_PERCENT * data.month_value) {
    throw new Error(
      "Valor mínimo da parcela mensal é de 1% do valor do empréstimo"
    );
  }

  const interest: number = interestPerState[data.uf];
};

export const LoanService = {
  create,
  simulate,
};
