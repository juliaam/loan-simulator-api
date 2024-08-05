import { createLoan } from "../repositorys/loan.repository";
import { ILoan } from "../controllers/loan.controller";

const interestPerState = {
  mg: 0.01,
  sp: 0.008,
  rj: 0.009,
  es: 0.0111,
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

  const result: any = [];\

  const interestPerCent: number = interestPerState[data.uf];

  let outStadingBalance = data.total_value;
  let installmentDate = new Date();

  while (outStadingBalance !== 0) {
    const interest = outStadingBalance * interestPerCent;
    const adjustedOutstandingBalance = outStadingBalance + interest;

    const installmentAmount =
      data.month_value > adjustedOutstandingBalance
        ? adjustedOutstandingBalance
        : data.month_value;

    result.push({
      outstandingBalance: outStadingBalance.toFixed(2),
      interest: interest.toFixed(2),
      adjustedOutstandingBalance: adjustedOutstandingBalance.toFixed(2),
      installmentAmount: installmentAmount.toFixed(2),
      dueDate: installmentDate,
    });

    outStadingBalance = adjustedOutstandingBalance - installmentAmount;

    installmentDate.setMonth(installmentDate.getMonth() + 1);
  }

  return result;
};

export const LoanService = {
  create,
  simulate,
};
