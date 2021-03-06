import { createSlice } from '@reduxjs/toolkit';
import { AuthStore } from './types';
import { tokenService } from 'services/TokenService';
import { fetchLogin, fetchSignUp, fetchMyself } from './actions';
import { message } from 'antd';

const initialState: AuthStore = {
    isAuthorized: Boolean(tokenService.getToken()),
    userInfo: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthorized = false;
            state.userInfo = null;

            tokenService.removeToken();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLogin.fulfilled, (state) => {
            state.isAuthorized = true;
        });
        builder.addCase(fetchLogin.rejected, (_, { payload }) => {
            message.error('Что-то пошло не так, попробуйте позже');

            console.error(payload);
        });
        builder.addCase(fetchSignUp.fulfilled, (_, { payload }) => {
            if (payload.success) {
                message.success(
                    'Аккаунт успешно создан, вы можете войти в аккаунт на странице авторизации'
                );
            }
        });
        builder.addCase(fetchSignUp.rejected, (_, { payload }) => {
            message.error('Что-то пошло не так, попробуйте позже');

            console.error(payload);
        });
        builder.addCase(fetchMyself.fulfilled, (state, { payload }) => {
            state.userInfo = payload.data;

            localStorage.setItem('role', payload.data.role);
        });
    },
});

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
