import express from "express";
import {
  createTask,
  deleteTask,
  updateTaskStatus,
} from "../controllers/taskControllers.js";

const router = express.Router();

router.post("/", createTask);
router.put("/:id", updateTaskStatus);
router.delete("/:id", deleteTask);

export default router;
