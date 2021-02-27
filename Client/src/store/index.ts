import { configureStore } from '@reduxjs/toolkit';
import { createSelectorHook, useDispatch as useAppDispatch } from 'react-redux';
import { authReducer } from './auth';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // app: appReducer,
        // users: usersReducer,
        // auth: authReducer,
        // results: resultsReducer,
        // farms: farmsReducer,
        // companies: companiesReducer,
        // backgrounds: backgroundsReducer,
        // complexes: complexesReducer,
        // postingSessions: postingSessionsReducer,
    },
    // middleware: [
    //     ...getDefaultMiddleware({
    //         immutableCheck: false,
    //         serializableCheck: false,
    //     }),
    // ],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useAppDispatch<AppDispatch>();

export const useSelector = createSelectorHook<RootState>();
