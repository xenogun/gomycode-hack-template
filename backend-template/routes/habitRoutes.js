import express from "express";
import { submitHabitForm, getAllHabits } from "../controllers/habitController.js";

const router = express.Router();

router.post("/submit", submitHabitForm);
router.get("/", getAllHabits);

export default router;
