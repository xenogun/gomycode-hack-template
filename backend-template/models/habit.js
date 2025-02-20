import { Schema, model } from "mongoose";

const habitSchema = new Schema({
    sleepHours: { type: String, required: true },
    sleepQuality: { type: String, required: true },
    screenTime: { type: String, required: true },
    exerciseDays: { type: String, required: true },
    fruitsVeggies: { type: String, required: true },
    waterIntake: { type: String, required: true },
    stressLevel: { type: String, required: true },
    concentration: { type: String, required: true },
    recommendations: { type: [String], default: [] },
});

export default model("Habit", habitSchema);
