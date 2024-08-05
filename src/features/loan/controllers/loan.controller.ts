import { LoanService } from "../services/loan.service";

export interface ILoan {
  cpf: string;
  uf: "mg" | "sp" | "rj" | "es";
  birth: Date;
  total_value: number;
  month_value: number;
}

const create = async (req: any, res: any) => {
  try {
    const loan = await LoanService.create(req.body);
    res.status(200).send(loan);
  } catch (error) {
    res.status(400).send(error);
  }
};

const simulate = async (req: any, res: any) => {
  try {
    const simulate = await LoanService.simulate(req.body);
    res.status(200).send(simulate);
  } catch (error) {
    res.status(400).send(error);
  }
};
export const loanController = {
  create,
  simulate,
};
