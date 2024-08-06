import { Router } from "express";
import { loanController } from "../controllers/loan.controller";

const router = Router();

router.get("/", loanController.findAll);
router.post("/", loanController.create);
router.post("/simulate", loanController.simulate);

export default router;
