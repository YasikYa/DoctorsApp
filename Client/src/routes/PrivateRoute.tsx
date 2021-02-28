import { Route, Redirect, RouteProps } from 'react-router-dom';
import { paths } from 'routes/paths';
import { tokenService } from 'services/TokenService';

export const PrivateRoute = (props: RouteProps) => {
    const isAuthenticated = tokenService.getToken();

    // if the user is not authorized, redirect to the login page
    if (isAuthenticated) {
        return <Route {...props} />;
    }
    return <Redirect to={paths.LOGIN} />;
};
