import { get, post, del } from 'services/HttpService';
import { Specialty } from './types';

export const getAllSpecialties = () => get<Specialty[]>('/api/Specialty');

export const createSpecialty = (specialtyName: string) =>
    post<Specialty>('/api/Specialty', specialtyName);

export const deleteSpecialty = (specialtyId: string) => del(`/api/Specialty/${specialtyId}`);
