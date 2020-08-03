import { State } from './state';
import { Patient, Diagnosis } from '../types';

export type Action =
    | {
          type: 'SET_PATIENT_LIST';
          payload: Patient[];
      }
    | {
          type: 'ADD_PATIENT';
          payload: Patient;
      }
    | {
          type: 'SET_SINGLE_PATIENT';
          payload: Patient;
      }
    | {
          type: 'SET_DIAGNOSES_LIST';
          payload: Diagnosis[];
      };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_PATIENT_LIST':
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({ ...memo, [patient.id]: patient }),
                        {},
                    ),
                    ...state.patients,
                },
            };

        case 'SET_SINGLE_PATIENT':
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload,
                },
            };
        case 'ADD_PATIENT':
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload,
                },
            };
        case 'SET_DIAGNOSES_LIST':
            return {
                ...state,
                diagnoses: {
                    ...action.payload.reduce(
                        (memo, diagnosis) => ({
                            ...memo,
                            [diagnosis.code]: diagnosis,
                        }),
                        {},
                    ),
                    ...state.diagnoses,
                },
            };
        default:
            return state;
    }
};

export const setPatientList = (patients: Patient[]): Action => {
    return {
        type: 'SET_PATIENT_LIST',
        payload: patients,
    };
};

export const setSinglePatient = (patient: Patient): Action => {
    return {
        type: 'SET_SINGLE_PATIENT',
        payload: patient,
    };
};

export const setDiagnosesList = (diagnoses: Diagnosis[]): Action => {
    return {
        type: 'SET_DIAGNOSES_LIST',
        payload: diagnoses,
    };
};
