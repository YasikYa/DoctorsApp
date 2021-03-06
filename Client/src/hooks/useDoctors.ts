import { useEffect } from 'react';
import { useDispatch, useSelector } from 'store';
import { fetchAllDoctors } from 'store/doctors/actions';

export const useDoctors = () => {
    const dispatch = useDispatch();

    const { loadedDoctors, doctors } = useSelector((state) => ({
        doctors: state.doctors.entities,
        loadedDoctors: state.doctors.loadedDoctors,
    }));

    useEffect(() => {
        if (!loadedDoctors) {
            dispatch(fetchAllDoctors());
        }
    }, [loadedDoctors, dispatch]);

    return {
        doctors,
    };
};
