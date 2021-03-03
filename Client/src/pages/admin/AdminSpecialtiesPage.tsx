import { Button } from 'antd';
import { PageType } from 'pages/types';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'store';
import { fetchAllSpecialties } from 'store/specialties/actions';

const AdminSpecialtiesPage: PageType = () => {
    const dispatch = useDispatch();

    const { specialties, loadedSpecialties } = useSelector((state) => ({
        specialties: state.specialties.entities,
        loadedSpecialties: state.specialties.loadedSpecialties,
    }));

    useEffect(() => {
        if (!loadedSpecialties) {
            dispatch(fetchAllSpecialties());
        }
    }, [loadedSpecialties, dispatch]);

    return (
        <div>
            <header>
                <h1>Специальности врачей</h1>

                <Button type="primary">Создать специальность</Button>
            </header>
        </div>
    );
};

export default AdminSpecialtiesPage;
