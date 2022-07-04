import { Router } from "express";
import {
  signIn,
  signOut,
  signUp,
  updateToken,
} from "../controllers/authController.js";
import validateToken from "../middlewares/validateToken.js";

const router = Router();

router.post("/sign-in", signIn);

router.post("/sign-up", signUp);

router.post("/sign-out", signOut);

router.put("/status", validateToken, updateToken);

export default router;
