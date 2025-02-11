import express from "express";
import {
  createSection,
  getSections,
} from "../controllers/sectionControllers.js";

const router = express.Router();

router.get("/", getSections);
router.post("/", createSection);

export default router;
