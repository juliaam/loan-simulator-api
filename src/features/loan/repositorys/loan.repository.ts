import { prisma } from "../../../services/prisma";
import { ILoan } from "../controllers/loan.controller";

export const createLoan = async (data: ILoan) => {
  return await prisma.loan.create({
    data,
  });
};
export const findAllLoans = async () => {
  return await prisma.loan.findMany();
};
