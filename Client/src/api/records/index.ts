import { Record } from './types';
import { RequestParams } from 'api/types';
import { get, post } from 'services/HttpService';

export const getAllRecordsByRole = ({
    payload,
}: RequestParams<{
    id: string;
    role: string;
}>) => get<Record[]>(`/api/Records/${payload.role.toLowerCase()}/${payload.id}`);

export const createRecord = ({ payload }: RequestParams<Record>) => post('/api/Records', payload);
