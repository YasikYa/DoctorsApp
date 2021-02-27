import { createSlice } from '@reduxjs/toolkit';
import { AuthStore } from './types';
import { tokenService } from 'services/TokenService';
import { fetchLogin } from './actions';

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
        builder.addCase(fetchLogin.pending, (state) => {
            state.loadingFlags[fetchLogin.typePrefix] = true;
        });
        builder.addCase(fetchLogin.fulfilled, (state, { payload: { token, rememberMe } }) => {
            state.isAuthorized = true;
            state.loadingFlags[fetchLogin.typePrefix] = false;

            tokenService.setToken(token, rememberMe);
        });
        builder.addCase(fetchLogin.rejected, (_, { payload }) => {
            console.log(payload);
        });
    },
});

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
