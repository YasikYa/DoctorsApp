import { configureStore } from '@reduxjs/toolkit';
import { createSelectorHook, useDispatch as useAppDispatch } from 'react-redux';
import { appReducer } from './app';
import { authReducer } from './auth';
import { doctorsReducer } from './doctors';
import { specialtiesReducer } from './specialties';
import { recordsReducer } from './records';
import { apiObserverMiddleware } from 'middlewares/apiObserverMiddleware';

export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        doctors: doctorsReducer,
        specialties: specialtiesReducer,
        records: recordsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(apiObserverMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useAppDispatch<AppDispatch>();

export const useSelector = createSelectorHook<RootState>();
