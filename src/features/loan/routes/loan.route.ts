import { Router } from "express";
import { loanController } from "../controllers/loan.controller";

const router = Router();

router.post("/simulate", loanController.simulate);
router.post("/", loanController.create);

export default router;
