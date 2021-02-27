import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from 'api/auth';
import { LoginPayload } from 'api/auth/types';

export const fetchLogin = createAsyncThunk(
    'auth/fetchLogin',
    async ({ email, password, rememberMe }: LoginPayload & { rememberMe: boolean }) => {
        const { data: token } = await login({ payload: { email, password } });

        return { token, rememberMe };
    }
);
