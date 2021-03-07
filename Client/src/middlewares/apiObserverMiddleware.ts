import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { setIsLoading, setLoadingFlag } from 'store/app';

export const apiObserverMiddleware: Middleware = ({ dispatch }) => (next) => (
    action: AnyAction
) => {
    const { type } = action;
    if (type.includes('fetch')) {
        dispatch(setIsLoading(type.includes('pending')));

        const typePrefix = type.split('/').slice(0, 2).join('/');

        if (type.includes('pending')) {
            dispatch(
                setLoadingFlag({
                    actionType: typePrefix,
                    value: true,
                })
            );
        } else if (type.includes('rejected') || type.includes('fulfilled')) {
            dispatch(
                setLoadingFlag({
                    actionType: typePrefix,
                    value: false,
                })
            );
        }
    }

    return next(action);
};
