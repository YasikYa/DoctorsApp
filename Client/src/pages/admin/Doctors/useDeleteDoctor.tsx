import { Modal } from 'antd';
import { useCallback } from 'react';
import { CloseIcon } from 'shared/icons/CloseIcon';
import { useDispatch } from 'store';
import { fetchDeleteDoctor } from 'store/doctors/actions';

export const useDeleteDoctor = () => {
    const dispatch = useDispatch();

    const deleteDoctor = useCallback(
        (doctorId: string) => {
            Modal.confirm({
                cancelButtonProps: {
                    size: 'large',
                },
                okButtonProps: {
                    size: 'large',
                    type: 'primary',
                    danger: true,
                },
                okText: 'Удалить врача',
                cancelText: 'Отмена',
                icon: null,
                width: 480,
                closable: true,
                closeIcon: CloseIcon,
                content: (
                    <>
                        <h2 style={{ marginBottom: 20, fontSize: 30 }}>Вы уверены?</h2>
                        
                        <p style={{ fontSize: 16 }}>
                            Если вы удалите врача, все связанные данные будут потеряны. Вы уверены,
                            что хотите полностью удалить выбранного врача?
                        </p>
                    </>
                ),
                onOk: async () => {
                    await dispatch(fetchDeleteDoctor(doctorId));
                },
            });
        },
        [dispatch]
    );

    return {
        deleteDoctor,
    };
};
