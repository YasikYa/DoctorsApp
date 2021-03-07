import { Modal } from 'antd';
import { useCallback } from 'react';
import { CloseIcon } from 'shared/icons/CloseIcon';
import { useDispatch } from 'store';
import { fetchDeleteRecord } from 'store/records/actions';

export const useCancelRecord = () => {
    const dispatch = useDispatch();

    const cancelRecord = useCallback(
        ({ doctorId, patientId }: { doctorId: string; patientId: string }) => {
            Modal.confirm({
                cancelButtonProps: {
                    size: 'large',
                },
                okButtonProps: {
                    size: 'large',
                    type: 'primary',
                    danger: true,
                },
                okText: 'Отменить запись',
                cancelText: 'Отмена',
                icon: null,
                width: 480,
                closable: true,
                closeIcon: CloseIcon,
                content: (
                    <>
                        <h2 style={{ marginBottom: 20, fontSize: 30 }}>Вы уверены?</h2>

                        <p style={{ fontSize: 16 }}>
                            Если вы отмените данную запись, то возможно не сможете установить на эту
                            же дату. Вы уверены, что хотите отменить запись на приём?
                        </p>
                    </>
                ),
                onOk: async () => {
                    await dispatch(fetchDeleteRecord({ doctorId, patientId }));
                },
            });
        },
        [dispatch]
    );

    return {
        cancelRecord,
    };
};
