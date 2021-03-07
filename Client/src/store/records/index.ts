import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import { RecordsState } from './types';
import { fetchCreateRecord, fetchAllRecords, fetchDeleteRecord } from './actions';

const initialState: RecordsState = {
    entities: [],
    loadedRecords: false,
};

const recordsSlice = createSlice({
    name: 'records',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllRecords.fulfilled, (state, { payload }) => {
            state.entities = payload;
        });
        // fetch creating
        builder.addCase(fetchCreateRecord.fulfilled, (state, { payload }) => {
            state.entities.push(payload);

            message.success('Запись на приём успешна сохранена');
        });
        builder.addCase(fetchCreateRecord.rejected, () => {
            message.success('При сохранении что-то пошло не так, попробуйте позже');
        });
        // fetch deleting
        builder.addCase(fetchDeleteRecord.fulfilled, (state, { payload }) => {
            state.entities = state.entities.filter(({ doctorId, patientId }) => {
                return doctorId !== payload.doctorId && patientId !== payload.patientId;
            });

            message.success('Запись на приём успешна отменена');
        });
    },
});

export const recordsReducer = recordsSlice.reducer;
