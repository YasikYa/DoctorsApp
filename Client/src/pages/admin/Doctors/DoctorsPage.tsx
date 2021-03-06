import { PageType } from 'pages/types';
import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'store';
import { fetchAllDoctors } from 'store/doctors/actions';
import styled from 'styled-components';
import { DoctorsTable } from './DoctorsTable';

const DoctorsPage: PageType = ({ className }) => {
    const dispatch = useDispatch();

    const { doctors, loadedDoctors } = useSelector((state) => ({
        doctors: state.doctors.entities,
        loadedDoctors: state.doctors.loadedDoctors,
    }));

    useEffect(() => {
        if (!loadedDoctors) {
            dispatch(fetchAllDoctors());
        }
    }, [loadedDoctors, dispatch]);

    return (
        <div className={className}>
            <header>
                <h1>Список врачей</h1>

                <Link to="/admin/doctors/create" className="ant-btn ant-btn-primary ant-btn-lg">
                    Добавить врача
                </Link>
            </header>

            <DoctorsTable doctors={doctors} />
        </div>
    );
};

export default styled(memo(DoctorsPage, () => true))`
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-block-end: 50px;

        .ant-btn.ant-btn-primary.ant-btn-lg:hover {
            color: #fff;
        }
    }
`;
