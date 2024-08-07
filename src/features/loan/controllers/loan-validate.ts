import { z } from "zod";

export const loanSchema = z.object({
  cpf: z
    .string()
    .length(11, { message: "O CPF deve ter exatamente 11 caracteres" }),
  uf: z.enum(["mg", "sp", "rj", "es"], {
    errorMap: (issue, _ctx) => ({ message: "Estado inválido" }),
  }),
  birth: z
    .string()
    .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/, {
      message: "Data de nascimento deve estar no formato DD/MM/YYYY",
    }),
  total_value: z.number().nonnegative({
    message: "O valor total deve ser um número positivo ou zero",
  }),
  month_value: z.number().nonnegative({
    message: "O valor da parcela deve ser um número positivo ou zero",
  }),
});
