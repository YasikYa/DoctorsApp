import { useEffect } from 'react';
import { useDispatch, useSelector } from 'store';
import { fetchAllRecords } from 'store/records/actions';

export const useRecords = () => {
    const dispatch = useDispatch();

    const { records, loadedRecords, userInfo } = useSelector((state) => ({
        records: state.records.entities,
        loadedRecords: state.records.loadedRecords,
        userInfo: state.auth.userInfo,
    }));

    useEffect(() => {
        if (userInfo && !loadedRecords) {
            const { role, id } = userInfo;
            dispatch(fetchAllRecords({ role, id }));
        }
    }, [dispatch, loadedRecords, userInfo]);

    return {
        records,
    };
};
