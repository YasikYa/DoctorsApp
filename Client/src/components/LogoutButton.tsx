import React from 'react';
import { useDispatch } from 'store';
import { useHistory } from 'react-router-dom';
import { logout } from 'store/auth';
import { paths } from 'routes/paths';
import { Button } from 'antd';

export const LogoutButton = () => {
    const dispatch = useDispatch();
    const { push } = useHistory();

    const handleLogout = () => {
        localStorage.clear();

        dispatch(logout());

        push(paths.LOGIN);
    };

    return <Button onClick={handleLogout}>Выйти</Button>;
};
