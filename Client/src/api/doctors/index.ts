import { del, get, post } from 'services/HttpService';
import { RequestParams } from 'api/types';
import { Doctor, CreateDoctorPayload } from './types';
import { ReactText } from 'react';

export const getAllDoctors = () => get<Doctor[]>('/api/Doctors');

export const createDoctor = ({ payload }: RequestParams<CreateDoctorPayload>) =>
    post<Doctor>('/api/Doctors', payload);

export const deleteDoctor = ({ payload }: RequestParams<ReactText>) =>
    del(`/api/Doctors/${payload}`);
