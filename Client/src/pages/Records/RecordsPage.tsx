import { PageType } from 'pages/types';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'store';
import classNames from 'classnames';
import styled from 'styled-components';
import { fetchAllRecords } from 'store/records/actions';

const RecordsPage: PageType = ({ className }) => {
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

    useEffect(() => {
        console.log(records);
    }, [records]);

    return <div className={classNames('page', { [className!]: className })}></div>;
};

export default styled(memo(RecordsPage, () => true))``;
