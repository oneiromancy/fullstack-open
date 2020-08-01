import express from 'express';
import patientServices from '../services/patients';
import { toNewPatient } from '../utils/patients';

const router = express.Router();

router.get('/', (_req, res) => {
    return res.json(patientServices.getAll());
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    return res.json(patientServices.getById(id));
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);

        return res.json(patientServices.createOne(newPatient));
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

export default router;
