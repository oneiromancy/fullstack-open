import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { evaluateFitnessRecord } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    return res.send('Hello, Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    if (!height || !weight)
        res.status(400).json({ error: 'parameters missing' });

    const formattedHeight: number = Number(height),
        formattedWeights: number = Number(weight);

    if (isNaN(formattedHeight) || isNaN(formattedWeights))
        return res.status(400).json({ error: 'malformatted parameters' });

    const healthMessage = calculateBmi(formattedHeight, formattedWeights);

    return res.json({
        height: formattedHeight,
        weight: formattedWeights,
        healthMessage,
    });
});

app.post('/exercises', (req, res) => {
    const { dailyTarget, exerciseRecord } = req.body;

    if (!dailyTarget || !exerciseRecord)
        res.status(400).json({ error: 'parameters missing' });

    const formattedDailyTarget: number = Number(dailyTarget),
        formattedExerciseRecord: Array<number> = exerciseRecord.map(
            (entry: any) => Number(entry),
        );

    if (isNaN(formattedDailyTarget) || !Array.isArray(formattedExerciseRecord))
        res.status(400).json({ error: 'malformatted parameters' });

    const fitnessEvaluation = evaluateFitnessRecord(
        formattedDailyTarget,
        formattedExerciseRecord,
    );

    return res.json(fitnessEvaluation);
});

const PORT = 3001;

app.listen(PORT, () => `Server running on port ${PORT}`);
