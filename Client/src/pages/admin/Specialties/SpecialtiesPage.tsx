import { Button } from 'antd';
import { PageType } from 'pages/types';
import { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'store';
import { fetchAllSpecialties } from 'store/specialties/actions';
import styled from 'styled-components';
import { CreateSpecialtyModal } from './CreateSpecialtyModal';
import { SpecialtiesTable } from './SpecialtiesTable';

const SpecialtiesPage: PageType = ({ className }) => {
    const dispatch = useDispatch();
    const [visiableModalCreating, setVisiableModalCreating] = useState(false);

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
        <div className={className}>
            <CreateSpecialtyModal
                visible={visiableModalCreating}
                toggleVisible={setVisiableModalCreating}
            />

            <header>
                <h1>Специальности врачей</h1>

                <Button
                    type="primary"
                    size="large"
                    onClick={() => {
                        setVisiableModalCreating(true);
                    }}
                >
                    Создать специальность
                </Button>
            </header>

            <SpecialtiesTable specialties={specialties} />
        </div>
    );
};

export default styled(memo(SpecialtiesPage, () => true))`
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-block-end: 50px;
    }
`;
