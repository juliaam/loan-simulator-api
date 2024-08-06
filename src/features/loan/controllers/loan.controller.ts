import { z } from "zod";
import { LoanService } from "../services/loan.service";
import { loanSchema } from "./loan-validate";

export interface ILoan {
  cpf: string;
  uf: "mg" | "sp" | "rj" | "es";
  birth: string;
  total_value: number;
  month_value: number;
}

const findAll = async (req: any, res: any) => {
  try {
    const loans = await LoanService.findAll();
    res.status(200).send(loans);
  } catch (error) {
    res.status(400).send(error);
  }
};

const create = async (req: any, res: any) => {
  try {
    const parsedData = loanSchema.parse(req.body);

    const loan = await LoanService.create(parsedData);
    res.status(200).send(loan);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(409).send({
        issues: error.format(),
        message: "Validation error",
      });
    } else {
      res.status(400).send(error);
    }
  }
};

const simulate = async (req: any, res: any) => {
  try {
    const parsedData = loanSchema.parse(req.body);

    const simulate = await LoanService.simulate(parsedData);
    res.status(200).send(simulate);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(409).send({
        issues: error.format(),
        message: "Validation error",
      });
    } else {
      res.status(400).send(error);
    }
  }
};
export const loanController = {
  findAll,
  create,
  simulate,
};
