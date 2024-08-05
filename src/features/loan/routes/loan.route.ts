import { Router } from "express";

const router = Router();

const loanController = {
  something: () => 1,
};

router.get("/", loanController.something);
router.post("/", loanController.something);

export default router;
