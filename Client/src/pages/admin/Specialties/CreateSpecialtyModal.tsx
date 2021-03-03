import { useDispatch, useSelector } from 'store';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Input, Modal } from 'antd';
import { CloseIcon } from 'shared/icons/CloseIcon';
import styled from 'styled-components';
import { FormField } from 'shared/components/FormField';
import { ErrorMessage } from 'shared/components/ErrorMessage';
import { useCallback } from 'react';
import { fetchCreateSpecialty } from 'store/specialties/actions';

type CreateSpecialtyModalProps = {
    visible: boolean;
    toggleVisible: (val: boolean) => void;
    className?: string;
};

type CreateSpecialtyForm = {
    name: string;
};

export const CreateSpecialtyModal = styled(
    ({ visible, toggleVisible, className }: CreateSpecialtyModalProps) => {
        const dispatch = useDispatch();

        const specialties = useSelector((state) => state.specialties.entities);

        const form = useFormik<CreateSpecialtyForm>({
            initialValues: {
                name: '',
            },
            onSubmit: async ({ name }) => {
                const { type } = await dispatch(fetchCreateSpecialty(`"${name}"`));

                if (type.includes('fulfilled')) {
                    closeModal();
                }
            },
            validationSchema: Yup.object().shape({
                name: Yup.string()
                    .required('Название обязательное')
                    .test(
                        'specialtyExists',
                        'Такая специальность уже существует',
                        (value) => !specialties.some(({ name }) => name === value)
                    ),
            }),
        });

        const closeModal = useCallback(() => {
            form.resetForm();
            toggleVisible(false);
        }, [form, toggleVisible]);

        return (
            <Modal
                className={className}
                visible={visible}
                onCancel={closeModal}
                footer={null}
                closeIcon={CloseIcon}
                width={550}
            >
                <h2>Создание новой специальности</h2>

                <form onSubmit={form.handleSubmit}>
                    <FormField>
                        <label htmlFor="name">Название специальности *</label>

                        <Input
                            size="large"
                            data-error={Boolean(form.errors.name) && Boolean(form.touched.name)}
                            placeholder="Введите название"
                            value={form.values.name}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            name="name"
                            id="name"
                        />

                        {form.errors.name && form.touched.name && (
                            <ErrorMessage>{form.errors.name}</ErrorMessage>
                        )}
                    </FormField>

                    <div className="actions">
                        <Button size="large" htmlType="button" onClick={closeModal}>
                            Отмена
                        </Button>

                        <Button
                            disabled={!form.isValid}
                            loading={form.isSubmitting}
                            size="large"
                            htmlType="submit"
                            type="primary"
                            className="create-ps-modal__submit"
                        >
                            Создать специальность
                        </Button>
                    </div>
                </form>
            </Modal>
        );
    }
)`
    .ant-modal-body {
        padding-inline-start: 40px;
        padding-inline-end: 40px;
    }

    h2 {
        font-size: 25px;
        padding: 20px 0 30px;
    }

    .actions {
        display: flex;
        justify-content: space-between;
        margin-block-start: 20px;

        button:first-child {
            flex-basis: calc(40% - 12px);
        }

        button:nth-child(2) {
            flex-basis: calc(60% - 12px);
        }
    }
`;
