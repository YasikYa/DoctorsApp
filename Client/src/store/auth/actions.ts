import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, signUp } from 'api/auth';
import { LoginPayload, SignUpPayload } from 'api/auth/types';

export const fetchLogin = createAsyncThunk(
    'auth/fetchLogin',
    async ({ email, password, rememberMe }: LoginPayload & { rememberMe: boolean }) => {
        const token = await login({ payload: { email, password } });

        return { token, rememberMe };
    }
);

export const fetchSignUp = createAsyncThunk<{ success: boolean }, SignUpPayload>(
    'auth/fetchSignUp',
    async (payload) => {
        await signUp({ payload });

        return { success: true };
    }
);
