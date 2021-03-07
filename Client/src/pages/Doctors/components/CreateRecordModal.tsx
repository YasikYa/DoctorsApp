import { useDispatch, useSelector } from 'store';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, DatePicker, Modal } from 'antd';
import { CloseIcon } from 'shared/icons/CloseIcon';
import styled from 'styled-components';
import { FormField } from 'shared/components/FormField';
import { ErrorMessage } from 'shared/components/ErrorMessage';
import { useCallback } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { fetchCreateRecord } from 'store/records/actions';

const { RangePicker } = DatePicker;

type CreateRecordModalProps = {
    visible: boolean;
    toggleVisible: (val: boolean) => void;
    doctorId: string;
    className?: string;
};

type CreateRecordModalFields = {
    from: moment.Moment | null;
    to: moment.Moment | null;
};

export const CreateRecordModal = styled(
    ({ visible, toggleVisible, className, doctorId }: CreateRecordModalProps) => {
        const dispatch = useDispatch();

        const userInfo = useSelector((state) => state.auth.userInfo);

        const form = useFormik<CreateRecordModalFields>({
            initialValues: {
                from: null,
                to: null,
            },
            onSubmit: async ({ from, to }) => {
                if (doctorId && userInfo && from && to) {
                    await dispatch(
                        fetchCreateRecord({
                            doctorId,
                            patientId: userInfo?.id,
                            from: from?.toISOString(),
                            to: to?.toISOString(),
                        })
                    );
                }
            },
            validationSchema: Yup.object().shape({
                from: Yup.object()
                    .nullable(true)
                    .test(
                        'requiredWhenNull',
                        'Начальная дата обязательна',
                        (value) => value !== null
                    ),
                to: Yup.object()
                    .nullable(true)
                    .test(
                        'requiredWhenNull',
                        'Конечная дата обязательна',
                        (value) => value !== null
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
                <h2>Записаться на приём</h2>

                <form onSubmit={form.handleSubmit}>
                    <FormField>
                        <label htmlFor="date">Дата и время приёма *</label>

                        <RangePicker
                            id="date"
                            size="large"
                            className={classNames({
                                error:
                                    Boolean(form.errors.from) &&
                                    form.touched.from &&
                                    Boolean(form.errors.to) &&
                                    form.touched.to,
                            })}
                            ranges={{
                                Сегодня: [moment(), moment()],
                                'Этот месяц': [moment().startOf('month'), moment().endOf('month')],
                            }}
                            showTime
                            format="YYYY/MM/DD HH:mm"
                            onChange={(dates) => {
                                if (dates) {
                                    form.setValues({
                                        from: dates[0],
                                        to: dates[1],
                                    });
                                }
                            }}
                            onBlur={() => {
                                form.setTouched({
                                    from: true,
                                    to: true,
                                });
                            }}
                            allowClear={false}
                        />

                        {form.errors.from && form.touched.from && (
                            <ErrorMessage>{form.errors.from}</ErrorMessage>
                        )}

                        {!form.errors.from && form.errors.to && form.touched.to && (
                            <ErrorMessage>{form.errors.to}</ErrorMessage>
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
                            Записаться
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
