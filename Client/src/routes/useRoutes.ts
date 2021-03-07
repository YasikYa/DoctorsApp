import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'store';
import { routes } from './index';

export const useRoutes = () => {
    const userInfo = useSelector((state) => state.auth.userInfo);
    const isAuthorized = useSelector((state) => state.auth.isAuthorized);
    const [role, setRole] = useState(localStorage.getItem('role'));

    const filteredRoutes = useMemo(() => {
        return routes.filter((route) => {
            if (route.availableOnlyFor) {
                if (isAuthorized && route.availableOnlyFor === role) {
                    return true;
                }
                return false;
            }
            return true;
        });
    }, [isAuthorized, role]);

    useEffect(() => {
        if (userInfo) {
            setRole(userInfo.role);
        }
    }, [userInfo]);

    return {
        routes: filteredRoutes,
    };
};
