import { Specialty } from 'api/specialties/types';
import { Button, Table } from 'antd';
import { CloseIcon } from 'shared/icons/CloseIcon';
import styled from 'styled-components';
import { useDeleteSpecialty } from './useDeleteSpecialty';

export const SpecialtiesTable = styled(
    ({ specialties, className }: { specialties: Specialty[]; className?: string }) => {
        const { deleteSpecialty } = useDeleteSpecialty();

        return (
            <Table
                className={className}
                pagination={false}
                columns={[
                    {
                        title: 'Название специальности',
                        key: 'name',
                        dataIndex: 'name',
                        sorter: {
                            compare: (a, b) => a.name.localeCompare(b.name),
                        },
                    },
                    {
                        title: 'Удаление',
                        key: 'id',
                        width: '20%',
                        align: 'center',
                        render: (_, { id, name }) => (
                            <Button
                                className="btn-delete-specialty"
                                type="text"
                                icon={CloseIcon}
                                onClick={() => {
                                    deleteSpecialty(id);
                                }}
                                aria-label={`Удалить специальность "${name}"`}
                            ></Button>
                        ),
                    },
                ]}
                dataSource={specialties}
            />
        );
    }
)`
    .btn-delete-specialty {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }
`;
