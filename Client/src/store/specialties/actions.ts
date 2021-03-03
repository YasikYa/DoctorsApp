import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllSpecialties, createSpecialty, deleteSpecialty } from 'api/specialties';

export const fetchAllSpecialties = createAsyncThunk('specialties/fetchAllSpecialties', async () => {
    const { data } = await getAllSpecialties();
    return data;
});

export const fetchCreateSpecialty = createAsyncThunk(
    'specialties/fetchCreateSpecialty',
    async (specialtyName: string) => {
        const { data } = await createSpecialty(specialtyName);
        return data;
    }
);

export const fetchDeleteSpecialty = createAsyncThunk(
    'specialties/fetchDeleteSpecialty',
    async (specialtyId: string) => {
        await deleteSpecialty(specialtyId);
        
        return specialtyId;
    }
);
