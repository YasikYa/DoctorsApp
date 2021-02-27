import { get } from 'services/HttpService';
import { RequestParams } from 'api/types';
import { LoginPayload, Token } from './types';

export const login = ({ payload: { email, password } }: RequestParams<LoginPayload>) =>
    get<Token>('/api/User/token', {
        params: {
            email,
            password,
        },
    });
