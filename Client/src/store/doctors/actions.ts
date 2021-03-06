import { createAsyncThunk } from '@reduxjs/toolkit';
import { createDoctor, deleteDoctor, getAllDoctors } from 'api/doctors';
import { CreateDoctorPayload, Doctor } from 'api/doctors/types';

export const fetchAllDoctors = createAsyncThunk('doctors/fetchAllDoctors', async () => {
    const { data } = await getAllDoctors();
    return data;
});

export const fetchCreateDoctor = createAsyncThunk<Doctor, CreateDoctorPayload>(
    'doctors/fetchCreateDoctor',
    async (payload) => {
        const { data } = await createDoctor({ payload });
        return data;
    }
);

export const fetchDeleteDoctor = createAsyncThunk(
    'doctors/fetchDeleteDoctor',
    async (payload: string) => {
        await deleteDoctor({ payload });

        return payload;
    }
);
