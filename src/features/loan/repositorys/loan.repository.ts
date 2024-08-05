import { prisma } from "../../../services/prisma";
import { ILoan } from "../controllers/loan.controller";
import { Loan } from "../../loan-sequelize/models/loan-model";
// export const createLoan = async (data: ILoan) => {
//   return await prisma.loan.create({
//     data,
//   });
// };

export const createLoan = async (data: ILoan) => {
  try {
    const newLoan = await Loan.create(data);
    return newLoan;
  } catch (error) {
    console.error("Error creating loan:", error);
    throw error;
  }
};
