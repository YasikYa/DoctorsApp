import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import { Doctor } from 'api/doctors/types';
import { fetchAllDoctors, fetchCreateDoctor, fetchDeleteDoctor } from './actions';
import { DoctorsState } from './types';

const initialState: DoctorsState = {
    entities: [],
    entitiesById: {},
    loadedDoctors: false,
};

const doctorsSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // fetch all
        builder.addCase(fetchAllDoctors.fulfilled, (state, { payload }) => {
            state.entities = payload;

            state.entitiesById = payload.reduce(
                (accumulator: { [doctorId: string]: Doctor }, currentValue) => {
                    accumulator[currentValue.id] = currentValue;
                    return accumulator;
                },
                {}
            );

            state.loadedDoctors = true;
        });
        builder.addCase(fetchAllDoctors.rejected, () => {
            message.error('Что-то пошло не так при загрузке списка врачей, попробуйте позже');
        });
        // creating new
        builder.addCase(fetchCreateDoctor.fulfilled, (state, { payload }) => {
            state.entities.push(payload);

            message.success('Новый врач успешно добавлен');
        });
        builder.addCase(fetchCreateDoctor.rejected, () => {
            message.error('При добавлении врача что-то пошло не так, попробуйте позже');
        });
        // deleting
        builder.addCase(fetchDeleteDoctor.fulfilled, (state, { payload }) => {
            state.entities = state.entities.filter(({ id }) => id !== payload);

            message.success('Врач успешно удалён');
        });
        builder.addCase(fetchDeleteDoctor.rejected, (state, { payload }) => {
            message.error('При удалении врача что-то пошло не так, попробуйте позже');
        });
    },
});

export const doctorsReducer = doctorsSlice.reducer;
