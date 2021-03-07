import { PageType } from 'pages/types';
import { memo, useCallback } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { Container } from 'shared/components/Container';
import { Button, Empty } from 'antd';
import { useDoctors } from 'hooks/useDoctors';
import { useRecords } from 'hooks/useRecords';
import { useCancelRecord } from './useCancelRecord';

const RecordsPage: PageType = ({ className }) => {
    const { records } = useRecords();
    const { doctorsById } = useDoctors();

    const { cancelRecord } = useCancelRecord();

    const formatDate = useCallback((date: string) => {
        return new Intl.DateTimeFormat('ru', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(new Date(date));
    }, []);

    const formatTime = useCallback((date: string) => {
        return new Intl.DateTimeFormat('ru', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(date));
    }, []);

    return (
        <div className={classNames('page', { [className!]: className })}>
            <Container>
                <h1>Записи на приём</h1>

                {records.length ? (
                    <ul className="records-list">
                        {records.map(({ patientId, doctorId, from, to }) => (
                            <li className="record" key={patientId + doctorId}>
                                <span className="date">Когда: {formatDate(from)}</span>
                                <span className="date">
                                    Время: с {formatTime(from)} до {formatTime(to)}
                                </span>
                                <span>
                                    Доктор: {doctorsById[doctorId]?.lastName}{' '}
                                    {doctorsById[doctorId]?.firstName}
                                </span>

                                <Button
                                    type="primary"
                                    danger
                                    onClick={() => {
                                        cancelRecord({ patientId, doctorId });
                                    }}
                                >
                                    Отменить запись
                                </Button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <Empty description="У вас ещё не одной записи" />
                )}
            </Container>
        </div>
    );
};

export default styled(memo(RecordsPage, () => true))`
    background-color: #fafafa;
    padding-block-start: 40px;
    padding-block-end: 40px;

    .records-list {
        margin-block-start: 40px;
    }

    .record {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-weight: 500;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0px 0px 8px 4px rgba(34, 60, 80, 0.04);

        &:not(:last-child()) {
            margin-block-end: 20px;
        }

        button {
            margin-block-start: 20px;
        }
    }
`;
