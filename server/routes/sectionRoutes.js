import express from "express";
import { createSection } from "../controllers/sectionControllers.js";

const router = express.Router();

router.post("/", createSection);

export default router;
