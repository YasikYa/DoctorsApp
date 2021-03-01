import { createSlice } from '@reduxjs/toolkit';
import { AuthStore } from './types';
import { tokenService } from 'services/TokenService';
import { fetchLogin, fetchSignUp } from './actions';
import { message } from 'antd';

const initialState: AuthStore = {
    loadingFlags: {},
    isAuthorized: Boolean(tokenService.getToken()),
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthorized = false;

            tokenService.removeToken();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLogin.fulfilled, (state, { payload: { token, rememberMe } }) => {
            state.isAuthorized = true;

            tokenService.setToken(token, rememberMe);
        });
        builder.addCase(fetchLogin.rejected, (_, { payload }) => {
            message.error('Something went wrong');

            console.error(payload);
        });
        builder.addCase(fetchSignUp.fulfilled, (_, { payload }) => {
            if (payload.success) {
                message.success('Registration completed successfully, tou can log in');
            }
        });
        builder.addCase(fetchSignUp.rejected, (_, { payload }) => {
            message.error('Something went wrong');

            console.error(payload);
        });
    },
});

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
