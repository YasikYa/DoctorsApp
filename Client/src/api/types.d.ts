export type RequestParams<T = any> = {
    payload: T;
    signal?: AbortSignal;
};
