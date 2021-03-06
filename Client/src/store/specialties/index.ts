import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import { SpecialtiesState } from './types';
import { fetchAllSpecialties, fetchCreateSpecialty, fetchDeleteSpecialty } from './actions';

const initialState: SpecialtiesState = {
    entities: [],
    loadedSpecialties: false,
};

const specialtiesSlice = createSlice({
    name: 'specialties',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // fetch all
        builder.addCase(fetchAllSpecialties.fulfilled, (state, { payload }) => {
            state.entities = payload;

            state.loadedSpecialties = true;
        });
        // fetch creating
        builder.addCase(fetchCreateSpecialty.fulfilled, (state, { payload }) => {
            state.entities.unshift(payload);

            message.success('Специальность успешно создана');
        });
        // fetch deleting
        builder.addCase(fetchDeleteSpecialty.fulfilled, (state, { payload }) => {
            state.entities = state.entities.filter(({ id }) => id !== payload);

            message.success('Специальность успешно удалена');
        });
    },
});

export const specialtiesReducer = specialtiesSlice.reducer;
