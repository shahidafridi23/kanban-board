import express from "express";
import {
  createTask,
  updateTaskStatus,
} from "../controllers/taskControllers.js";

const router = express.Router();

router.post("/", createTask);
router.put("/:id", updateTaskStatus);

export default router;
