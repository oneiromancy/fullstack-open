"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
let savedPatients = [...patients_1.default];
console.log(savedPatients);
const getAll = () => {
    return savedPatients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const getById = (id) => {
    console.log();
    return savedPatients.find((patient) => patient.id === id);
};
const createOne = (patient) => {
    const newPatient = Object.assign(Object.assign({}, patient), { id: uuid_1.v4(), entries: [] });
    savedPatients = savedPatients.concat(newPatient);
    const { ssn, entries } = newPatient, publicPatient = __rest(newPatient, ["ssn", "entries"]);
    return publicPatient;
};
exports.default = { getAll, getById, createOne };
