import { Record } from './types';
import { RequestParams } from 'api/types';
import { del, get, post } from 'services/HttpService';

export const getAllRecordsByRole = ({
    payload,
}: RequestParams<{
    id: string;
    role: string;
}>) => get<Record[]>(`/api/Records/${payload.role.toLowerCase()}/${payload.id}`);

export const createRecord = ({ payload }: RequestParams<Record>) => post('/api/Records', payload);

export const deleteRecord = ({
    payload: { doctorId, patientId },
}: RequestParams<{
    doctorId: string;
    patientId: string;
}>) =>
    del('/api/Records', {
        params: {
            doctorId,
            patientId,
        },
    });
