import { Doctor } from 'api/doctors/types';

export type DoctorsState = {
    loadingFlags: { [key: string]: boolean };
    loadedDoctors: boolean;
    entities: Doctor[];
};
