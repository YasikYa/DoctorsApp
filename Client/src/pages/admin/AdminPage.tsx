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
// import { fetchAllDoctors } from 'store/doctors/actions';

const AdminSpecialtiesPage = lazy(() => import('./Specialties/SpecialtiesPage'));

const AdminPage: PageType = ({ location: { pathname }, className }) => {
    // const dispatch = useDispatch();

    // const { loadedDoctors } = useSelector((state) => ({
    //     allDoctors: state.doctors.entities,
    //     loadingFlags: state.doctors.loadingFlags,
    //     loadedDoctors: state.doctors.loadedDoctors,
    // }));

    // useEffect(() => {
    //     if (!loadedDoctors) {
    //         dispatch(fetchAllDoctors());
    //     }
    // }, [dispatch, loadedDoctors]);

    if (pathname === paths.ADMIN_PANEL) {
        return <Redirect to="/admin/specialties" />;
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
        padding-inline-start: 100px;
    }
`;
