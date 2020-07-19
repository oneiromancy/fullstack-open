import diagnoses from '../data/diagnoses.json';
import { IDiagnosis } from '../types/diagnoses';

const getAll = (): Array<IDiagnosis> => {
    return diagnoses;
};

export default { getAll };
