import { prisma } from "@services/prisma";
import { ILoan } from "../controllers/loan.controller";

export const createLoan = async (data: ILoan) => {
  const loan = await prisma.loan.create({
    data,
  });
  return loan;
};
