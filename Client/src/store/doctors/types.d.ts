import { Doctor } from 'api/doctors/types';

export type DoctorsState = {
    loadedDoctors: boolean;
    entities: Doctor[];
    entitiesById: { [doctorId: string]: Doctor };
};
