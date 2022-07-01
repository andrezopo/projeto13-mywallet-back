import { Router } from "express";
import {
  getRecords,
  createRecord,
  deleteRecord,
  updateRecord,
} from "../controllers/recordsController.js";

const router = Router();

router.get("/records", getRecords);

router.post("/records", createRecord);

router.delete("/records", deleteRecord);

router.put("/records", updateRecord);

export default router;
