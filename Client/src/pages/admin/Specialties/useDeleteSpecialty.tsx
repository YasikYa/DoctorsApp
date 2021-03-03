import { Modal } from 'antd';
import { useCallback } from 'react';
import { CloseIcon } from 'shared/icons/CloseIcon';
import { useDispatch } from 'store';
import { fetchDeleteSpecialty } from 'store/specialties/actions';

export const useDeleteSpecialty = () => {
    const dispatch = useDispatch();

    const deleteSpecialty = useCallback(
        (specialtyId: string) => {
            Modal.confirm({
                cancelButtonProps: {
                    size: 'large',
                },
                okButtonProps: {
                    size: 'large',
                    type: 'primary',
                    danger: true,
                },
                okText: 'Удалить специальность',
                cancelText: 'Отмена',
                icon: null,
                width: 480,
                closable: true,
                closeIcon: CloseIcon,
                content: (
                    <>
                        <h2 style={{ marginBottom: 20, fontSize: 30 }}>Вы уверены?</h2>
                        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>
                            Предупреждение: это удалит все врачей, относящиеся к этому
                            специальностей
                        </p>
                        <p style={{ fontSize: 16 }}>
                            Если вы удалите специальность, все связанные данные будут потеряны. Вы
                            уверены, что хотите полностью удалить эту специальность?
                        </p>
                    </>
                ),
                onOk: async () => {
                    await dispatch(fetchDeleteSpecialty(specialtyId));
                },
            });
        },
        [dispatch]
    );

    return {
        deleteSpecialty,
    };
};
