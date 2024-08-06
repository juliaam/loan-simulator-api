import { createLoan, findAllLoans } from "../repositorys/loan.repository";
import { ILoan } from "../controllers/loan.controller";

const interestPerState = {
  mg: 0.01,
  sp: 0.008,
  rj: 0.009,
  es: 0.0111,
};

const ONE_PERCENT = 0.01;

const create = async (data: ILoan) => {
  if (data.total_value < 50000) {
    throw new Error("Valor mínimo para empréstimo é de R$50.5000");
  }

  if (data.month_value < ONE_PERCENT * data.month_value) {
    throw new Error(
      "Valor mínimo da parcela mensal é de 1% do valor do empréstimo"
    );
  }

  return await createLoan(data);
};

const findAll = async () => {
  return await findAllLoans();
};

const simulate = async (data: ILoan) => {
  const interest = interestPerState[data.uf];

  if (data.total_value < 50000) {
    throw new Error("Valor mínimo para empréstimo é de R$50.5000");
  }

  if (data.month_value < ONE_PERCENT * data.month_value) {
    throw new Error(
      "Valor mínimo da parcela mensal é de 1% do valor do empréstimo"
    );
  }

  const result: any = {
    parcels: [],
    monthsToQuit: 0,
    totalInterest: 0,
    totalPerCent: interest * 100,
  };

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

    result.monthsToQuit++;
    result.totalInterest = result.totalInterest + interest;

    result.parcels.push({
      outStadingBalance,
      interest,
      adjustedOutstandingBalance,
      installmentAmount,
      dueDate: installmentDate,
    });

    outStadingBalance = adjustedOutstandingBalance - installmentAmount;
    installmentDate.setMonth(installmentDate.getMonth() + 1);
  }

  result.totalWithInterest = result.totalInterest + data.total_value;
  result.totalInterest = result.totalInterest;

  return result;
};

export const LoanService = {
  create,
  simulate,
  findAll,
};
