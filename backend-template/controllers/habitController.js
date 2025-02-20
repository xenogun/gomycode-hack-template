import Habit from "../models/habit.js";

// Function to generate recommendations based on responses
function generateRecommendations(responses) {
    const recommendations = [];

    if (responses.sleepHours === "Moins de 6 heures") {
        recommendations.push(
            "Tu dors moins de 6 heures par nuit ? Essaye cette routine pour améliorer ton sommeil..."
        );
    }

    if (responses.screenTime === "Plus de 5 heures") {
        recommendations.push(
            "Tu passes beaucoup de temps devant un écran ? Pense à faire des pauses régulières..."
        );
    }

    if (responses.exerciseDays === "Jamais" || responses.exerciseDays === "1 à 2 jours") {
        recommendations.push(
            "Tu es trop sédentaire ? Essaye d'ajouter des pauses mouvement de 5 minutes dans ta journée..."
        );
    }

    if (responses.fruitsVeggies === "Rarement") {
        recommendations.push(
            "Tu manges peu de fruits et légumes ? Essaye d'en ajouter à chaque repas..."
        );
    }

    if (responses.waterIntake === "Moins de 4 verres") {
        recommendations.push(
            "Tu ne bois pas assez d'eau ? Essaye de boire un verre d'eau à chaque repas..."
        );
    }

    if (responses.stressLevel === "Souvent" || responses.stressLevel === "Très souvent") {
        recommendations.push(
            "Tu te sens souvent stressé(e) ? Essaye ces techniques pour te détendre..."
        );
    }

    if (responses.concentration === "Très faible" || responses.concentration === "Faible") {
        recommendations.push("Tu as du mal à te concentrer ? Essaye ces astuces...");
    }

    return recommendations;
}

// Save user responses and generate recommendations
export const submitHabitForm = async (req, res) => {
    try {
        const {
            sleepHours,
            sleepQuality,
            screenTime,
            exerciseDays,
            fruitsVeggies,
            waterIntake,
            stressLevel,
            concentration,
        } = req.body;

        // Generate recommendations
        const recommendations = generateRecommendations({
            sleepHours,
            screenTime,
            exerciseDays,
            fruitsVeggies,
            waterIntake,
            stressLevel,
            concentration,
        });

        // Save to database
        const habit = new Habit({
            sleepHours,
            sleepQuality,
            screenTime,
            exerciseDays,
            fruitsVeggies,
            waterIntake,
            stressLevel,
            concentration,
            recommendations,
        });

        await habit.save();

        res.status(201).json({
            message: "Form submitted successfully",
            data: habit,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all habits (for testing purposes)
export const getAllHabits = async (req, res) => {
    try {
        const habits = await Habit.find();
        res.status(200).json({ data: habits });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
