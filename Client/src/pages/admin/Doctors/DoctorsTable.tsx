import { Button, Table } from 'antd';
import { CloseIcon } from 'shared/icons/CloseIcon';
import styled from 'styled-components';
import { Doctor } from 'api/doctors/types';
import { useDeleteDoctor } from './useDeleteDoctor';
import { Specialty } from 'api/specialties/types';

export const DoctorsTable = styled(
    ({ doctors, className }: { doctors: Doctor[]; className?: string }) => {
        const { deleteDoctor } = useDeleteDoctor();

        return (
            <Table
                className={className}
                pagination={false}
                columns={[
                    {
                        title: 'Фамилия',
                        key: 'lastName',
                        dataIndex: 'lastName',
                        sorter: {
                            compare: (a, b) => a.lastName.localeCompare(b.lastName),
                        },
                    },
                    {
                        title: 'Имя',
                        key: 'firstName',
                        dataIndex: 'firstName',
                        sorter: {
                            compare: (a, b) => a.firstName.localeCompare(b.firstName),
                        },
                    },
                    {
                        title: 'Телефон',
                        key: 'contactPhone',
                        dataIndex: 'contactPhone',
                        sorter: {
                            compare: (a, b) => a.contactPhone.localeCompare(b.contactPhone),
                        },
                    },
                    {
                        title: 'Почта',
                        key: 'email',
                        dataIndex: 'email',
                        sorter: {
                            compare: (a, b) => a.email.localeCompare(b.email),
                        },
                    },
                    {
                        title: 'Специальность(и)',
                        key: 'specialties',
                        dataIndex: 'specialties',
                        render: (specialties: Specialty[]) => {
                            return <>{specialties.map(({ name }) => name).join('\n')}</>;
                        },
                    },
                    {
                        title: 'Удаление',
                        key: 'id',
                        width: '20%',
                        align: 'center',
                        render: (_, { firstName, lastName, id }) => (
                            <Button
                                className="btn-delete-doctor"
                                type="text"
                                icon={CloseIcon}
                                onClick={() => {
                                    deleteDoctor(id);
                                }}
                                aria-label={`Удалить врача, которого зовут ${lastName} ${firstName}`}
                            ></Button>
                        ),
                    },
                ]}
                dataSource={doctors.map((doctor) => ({
                    ...doctor,
                    key: doctor.id,
                }))}
            />
        );
    }
)`
    .btn-delete-doctor {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }
`;
