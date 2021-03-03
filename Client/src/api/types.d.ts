import { CancelToken } from 'axios';

export type RequestParams<T = any> = {
    payload: T;
    signal?: CancelToken;
};
