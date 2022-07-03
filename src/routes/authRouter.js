import { Router } from "express";
import { signIn, signUp, updateToken } from "../controllers/authController.js";
import validateToken from "../middlewares/validateToken.js";

const router = Router();

router.post("/sign-in", signIn);

router.post("/sign-up", signUp);

router.put("/status", validateToken, updateToken);

export default router;
