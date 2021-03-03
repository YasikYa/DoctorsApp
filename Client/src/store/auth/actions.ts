import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMyself, login, signUp } from 'api/auth';
import { LoginPayload, SignUpPayload } from 'api/auth/types';
import { tokenService } from 'services/TokenService';

export const fethMyself = createAsyncThunk('auth/fethMyself', () => getMyself());

export const fetchLogin = createAsyncThunk(
    'auth/fetchLogin',
    async (
        { email, password, rememberMe }: LoginPayload & { rememberMe: boolean },
        { dispatch }
    ) => {
        const token = await login({ payload: { email, password } });

        tokenService.setToken(token, rememberMe);

        dispatch(fethMyself());

        return { success: true };
    }
);

export const fetchSignUp = createAsyncThunk<{ success: boolean }, SignUpPayload>(
    'auth/fetchSignUp',
    async (payload) => {
        await signUp({ payload });

        return { success: true };
    }
);
