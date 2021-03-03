import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import { fetchAllDoctors } from './actions';
import { DoctorsState } from './types';

const initialState: DoctorsState = {
    entities: [],
    loadingFlags: {},
    loadedDoctors: false,
};

const doctorsSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllDoctors.pending, (state) => {
            state.loadingFlags[fetchAllDoctors.typePrefix] = true;
        });
        builder.addCase(fetchAllDoctors.fulfilled, (state, { payload }) => {
            state.entities = payload;
            state.loadingFlags[fetchAllDoctors.typePrefix] = false;

            state.loadedDoctors = true;
        });
        builder.addCase(fetchAllDoctors.rejected, (state, { payload }) => {
            state.loadingFlags[fetchAllDoctors.typePrefix] = false;

            console.error(payload);
            message.error('Something went wrong, try restarting the application');
        });
    },
});

export const doctorsReducer = doctorsSlice.reducer;
