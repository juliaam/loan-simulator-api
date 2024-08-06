import express from "express";
import cors from "cors";
import loanRouter from "../src/features/loan/routes/loan.route";

const app = express();

const corsOptions = {
  origin: "*",
  methods: "*",
  allowedHeaders: "*",
};

app.use(cors(corsOptions));

app.use(express.json());

// routes
app.use("/api/loan", loanRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is runnning in the port ${PORT}`);
});

export default app;
