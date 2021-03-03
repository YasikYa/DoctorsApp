import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createSelectorHook, useDispatch as useAppDispatch } from 'react-redux';
import { authReducer } from './auth';
import { doctorsReducer } from './doctors';
import { specialtiesReducer } from './specialties';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        doctors: doctorsReducer,
        specialties: specialtiesReducer,
    },
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false,
        }),
    ],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useAppDispatch<AppDispatch>();

export const useSelector = createSelectorHook<RootState>();
