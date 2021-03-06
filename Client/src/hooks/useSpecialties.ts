import { useEffect } from 'react';
import { useDispatch, useSelector } from 'store';
import { fetchAllSpecialties } from 'store/specialties/actions';

export const useSpecialties = () => {
    const dispatch = useDispatch();

    const { loadedSpecialties, specialties } = useSelector((state) => ({
        specialties: state.specialties.entities,
        loadedSpecialties: state.specialties.loadedSpecialties,
    }));

    useEffect(() => {
        if (!loadedSpecialties) {
            dispatch(fetchAllSpecialties());
        }
    }, [loadedSpecialties, dispatch]);

    return {
        specialties,
    };
};
