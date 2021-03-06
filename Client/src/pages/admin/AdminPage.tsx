import classNames from 'classnames';
import { PageType } from 'pages/types';
import { lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { paths } from 'routes/paths';
import { Container } from 'shared/components/Container';
import styled from 'styled-components';
import { AdminPageNav, adminPaths } from './AdminPageNav';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'store';
// import { fetchAllDoctors } from 'store/doctors/actions';CreateDoctorPage

const AdminSpecialtiesPage = lazy(() => import('./Specialties/SpecialtiesPage'));
const AdminDoctorsPage = lazy(() => import('./Doctors/DoctorsPage'));
const AdminCreateDoctorPage = lazy(() => import('./Doctors/CreateDoctorPage'));

const AdminPage: PageType = ({ location: { pathname }, className }) => {
    if (pathname === paths.ADMIN_PANEL) {
        return <Redirect to="/admin/doctors" />;
    }
    return (
        <div className={classNames('page', { [className!]: className })}>
            <Container className="container">
                <AdminPageNav />

                <div className="page-body">
                    <Switch>
                        <Route
                            exact
                            path={adminPaths.specialties.to}
                            component={AdminSpecialtiesPage}
                        />
                        <Route exact path={adminPaths.doctors.to} component={AdminDoctorsPage} />
                        <Route
                            exact
                            path="/admin/doctors/create"
                            component={AdminCreateDoctorPage}
                        />
                    </Switch>
                </div>
            </Container>
        </div>
    );
};

export default styled(AdminPage)`
    padding-block-start: 60px;
    padding-block-end: 60px;

    .container {
        display: flex;
        height: 100%;
    }

    .page-body {
        flex: 1;
        padding-inline-start: 75px;
    }
`;
