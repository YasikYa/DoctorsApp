import { Specialty } from 'api/specialties/types';

export type SpecialtiesState = {
    entities: Specialty[];
    loadedSpecialties: boolean;
};
