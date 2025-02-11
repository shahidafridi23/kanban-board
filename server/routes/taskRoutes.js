import express from "express";
import { createTask } from "../controllers/taskControllers.js";

const router = express.Router();

router.post("/", createTask);

export default router;
