import { Button, Empty } from 'antd';
import { Doctor } from 'api/doctors/types';
import { Specialty } from 'api/specialties/types';
import { useCallback, useState } from 'react';
import { useSelector } from 'store';
import styled from 'styled-components';
import { CreateRecordModal } from './CreateRecordModal';
import stethoscopeIcon from '../stethoscope.svg';
import moment from 'moment';

type DoctorsListProps = {
    doctors: Doctor[];
    className?: string;
};

export const DoctorsList = styled(({ doctors, className }: DoctorsListProps) => {
    const userInfo = useSelector((state) => state.auth.userInfo);

    const [visibleModal, setVisibleModal] = useState(false);
    const [choosedDoctorId, setChoosedDoctorId] = useState<string | null>(null);

    const calculateAge = (date: string) => {
        return moment().diff(date, 'years', false);
    };

    const getSpecialtiesList = useCallback((specialties: Specialty[]) => {
        const s = specialties.map(({ name }) => name).join(', ');

        return s.charAt(0).toUpperCase() + s.slice(1);
    }, []);

    return (
        <div className={className}>
            {userInfo?.role === 'Patient' && (
                <CreateRecordModal
                    visible={visibleModal}
                    toggleVisible={setVisibleModal}
                    doctorId={choosedDoctorId!}
                />
            )}

            {doctors.length ? (
                <ul className="list">
                    {doctors.map(
                        ({ firstName, lastName, consultPrice, specialties, id, dateOfBirth }) => (
                            <li key={id} className="list-item">
                                <aside className="list-item__aside">
                                    <img className="avatar" src={''} alt="Фото врача" />
                                </aside>

                                <div className="list-item__body">
                                    <span className="specialties">
                                        {getSpecialtiesList(specialties)}
                                    </span>
                                    <h4 className="fullname">
                                        {lastName} {firstName}
                                    </h4>

                                    <span className="price">
                                        Стоимость приёма:{' '}
                                        {new Intl.NumberFormat('ru-RU', {
                                            style: 'currency',
                                            currency: 'UAH',
                                        }).format(Number(consultPrice))}
                                    </span>

                                    <span className="age">
                                        Возраст: {calculateAge(dateOfBirth)}
                                    </span>

                                    {userInfo?.role === 'Patient' && (
                                        <Button
                                            className="btn-sign-up"
                                            size="large"
                                            type="primary"
                                            onClick={() => {
                                                setChoosedDoctorId(id);
                                                setVisibleModal(true);
                                            }}
                                        >
                                            Записаться
                                        </Button>
                                    )}
                                </div>
                            </li>
                        )
                    )}
                </ul>
            ) : (
                <Empty
                    style={{ marginBlockStart: 40 }}
                    description="По вашему запросу ничего не найдено"
                />
            )}
        </div>
    );
})`
    padding-inline-start: 20px;
    flex-grow: 1;
    display: flex;
    justify-content: center;

    .list {
        width: 100%;
    }

    .list-item {
        display: flex;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0px 0px 8px 4px rgba(34, 60, 80, 0.04);
        font-weight: 500;

        &:not(:last-child) {
            margin-block-end: 20px;
        }

        .avatar {
            width: 160px;
            height: 160px;
            background: url(${stethoscopeIcon}) center / 50% 50% no-repeat #fafafa;
        }

        &__body {
            flex-grow: 1;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            padding-inline-start: 20px;

            .fullname {
                width: 100%;
                font-size: 30px;
                padding-block-end: 10px;
                border-bottom: 1px dashed #d9d9d9;
            }

            .price,
            .age {
                padding-block-start: 10px;
            }
        }

        .btn-sign-up {
            align-self: flex-end;
        }
    }
`;
