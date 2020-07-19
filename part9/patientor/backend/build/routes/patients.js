"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patients_1 = __importDefault(require("../services/patients"));
const patients_2 = require("../utils/patients");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    return res.json(patients_1.default.getAll());
});
router.post('/', (req, res) => {
    try {
        const newPatient = patients_2.toNewPatientEntry(req.body);
        return res.json(patients_1.default.createOne(newPatient));
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
});
exports.default = router;
