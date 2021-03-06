import { createAsyncThunk } from '@reduxjs/toolkit';
import { createRecord, getAllRecordsByRole } from 'api/records';
import { Record } from 'api/records/types';

export const fetchCreateRecord = createAsyncThunk<Record, Record>(
    'records/fetchCreateRecord',
    async (payload) => {
        const { data } = await createRecord({ payload });
        return data;
    }
);

export const fetchAllRecords = createAsyncThunk(
    'records/fetchAllRecords',
    async (payload: { id: string; role: string }) => {
        const { data } = await getAllRecordsByRole({ payload });

        return data;
    }
);
