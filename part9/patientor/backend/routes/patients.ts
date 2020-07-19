import express from 'express';
import patientServices from '../services/patients';
import { toNewPatientEntry } from '../utils/patients';

const router = express.Router();

router.get('/', (_req, res) => {
    return res.json(patientServices.getAll());
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatientEntry(req.body);

        return res.json(patientServices.createOne(newPatient));
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

export default router;
