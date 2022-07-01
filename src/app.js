import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/authRouter.js";
import recordsRouter from "./routes/recordsRouter.js";

dotenv.config();

const app = express();
app.use([express.json(), cors()]);

app.use(authRouter);
app.use(recordsRouter);

app.listen(process.env.PORT, () => {
  console.log("Servidor rodando na porta 5000!");
});
