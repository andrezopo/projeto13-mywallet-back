import { Router } from "express";
import {
  getRecords,
  createRecord,
  deleteRecord,
  updateRecord,
} from "../controllers/recordsController.js";
import validateRecord from "../middlewares/validateRecord.js";
import validateToken from "../middlewares/validateToken.js";

const router = Router();

router.get("/records", validateToken, getRecords);

router.post("/records", validateToken, validateRecord, createRecord);

router.delete("/records", validateToken, deleteRecord);

router.put("/records", validateToken, validateRecord, updateRecord);

export default router;
