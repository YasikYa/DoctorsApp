import { get, post } from 'services/HttpService';
import { RequestParams } from 'api/types';
import { LoginPayload, SignUpPayload, Token, UserInfo } from './types';

export const login = async ({ payload: { email, password } }: RequestParams<LoginPayload>) => {
    const { data: token } = await post<Token>('/api/User/token', {
        email,
        password,
    });

    return {
        ...token,
        expires_in: 24 * 60 * 60, // seconds
    };
};

export const signUp = ({ payload }: RequestParams<SignUpPayload>) => post('/api/User', payload);

export const getMyself = () => get<UserInfo>('/api/User/me');
