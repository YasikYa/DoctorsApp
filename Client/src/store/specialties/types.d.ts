import { Specialty } from 'api/specialties/types';

export type SpecialtiesState = {
    entities: Specialty[];
    loadingFlags: { [key: string]: boolean };
    loadedSpecialties: boolean;
};
