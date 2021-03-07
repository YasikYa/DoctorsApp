import { PageType } from 'pages/types';
import { useDispatch, useSelector } from 'store';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { REGEXP_EMAIL } from 'shared/constants';
import classNames from 'classnames';
import styled from 'styled-components';
import { Select, DatePicker, Input, Button } from 'antd';
import InputMask from 'react-input-mask';
import { FormField } from 'shared/components/FormField';
import { ErrorMessage } from 'shared/components/ErrorMessage';
import { CalendarIcon } from 'shared/icons/CalendarIcon';
import { NumericInput } from 'shared/components/NumericInput';
import { useEffect } from 'react';
import { fetchAllSpecialties } from 'store/specialties/actions';
import { fetchCreateDoctor } from 'store/doctors/actions';

const { Option } = Select;

type CreateDoctorFields = {
    firstName: string;
    lastName: string;
    dateOfBirth: moment.Moment | null;
    contactPhone: string;
    consultPrice: number;
    email: string;
    password: string;
    specialties: string[];
};

const CreateDoctorFormSchema = Yup.object().shape({
    firstName: Yup.string().required('Имя обязательное'),
    lastName: Yup.string().required('Фамилия обязательна'),
    dateOfBirth: Yup.object()
        .nullable(true)
        .test('requiredWhenNull', 'Дата рождения обязательна', (value) => value !== null),
    contactPhone: Yup.string()
        .required('Телефон обязателен')
        .test(
            'notCompletelyFilled',
            'Телефон полностью не заполнен',
            (value) => !value?.includes('_')
        ),
    consultPrice: Yup.number()
        .required('Стоимость обязательна')
        .min(1, 'Стоимость должна быть больше нуля'),
    email: Yup.string().required('Почта обязательна').matches(REGEXP_EMAIL, 'Неверный формат'),
    password: Yup.string().required('Пароль обязателен'),
    specialties: Yup.array().test('requiredWhenEmpty', 'Минимум одна специальность', (value) =>
        Boolean(value?.length)
    ),
});

const DATE_FORMAT = 'YYYY/MM/DD';

const CreateDoctorPage: PageType = ({ className, history }) => {
    const dispatch = useDispatch();

    const { specialties, loadedSpecialties, loadingFlags } = useSelector((state) => ({
        specialties: state.specialties.entities,
        loadedSpecialties: state.specialties.loadedSpecialties,
        loadingFlags: state.app.loadingFlags,
    }));

    const {
        values,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        setFieldValue,
        setFieldTouched,
        isValid,
        isSubmitting,
    } = useFormik<CreateDoctorFields>({
        initialValues: {
            firstName: '',
            lastName: '',
            dateOfBirth: null,
            contactPhone: '',
            consultPrice: 0,
            email: '',
            password: '',
            specialties: [],
        },
        onSubmit: async (values) => {
            const { type } = await dispatch(
                fetchCreateDoctor({
                    ...values,
                    dateOfBirth: values.dateOfBirth!.toISOString(),
                })
            );

            if (type.includes('fulfilled')) {
                history.push('/admin/doctors');
            }
        },
        validationSchema: CreateDoctorFormSchema,
    });

    useEffect(() => {
        if (!loadedSpecialties) {
            dispatch(fetchAllSpecialties());
        }
    }, [loadedSpecialties, dispatch]);

    return (
        <div className={className}>
            <h1>Добавление врача</h1>

            <form onSubmit={handleSubmit}>
                <fieldset>
                    <FormField className="form-field">
                        <label htmlFor="lastName">Фамилия врача *</label>

                        <Input
                            size="large"
                            data-error={Boolean(errors.lastName) && touched.lastName}
                            placeholder="Введите фамилию"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="lastName"
                            id="lastName"
                        />

                        {errors.lastName && touched.lastName && (
                            <ErrorMessage>{errors.lastName}</ErrorMessage>
                        )}
                    </FormField>

                    <FormField className="form-field">
                        <label htmlFor="firstName">Имя врача *</label>

                        <Input
                            size="large"
                            data-error={Boolean(errors.firstName) && touched.firstName}
                            placeholder="Введите имя"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="firstName"
                            id="firstName"
                        />

                        {errors.firstName && touched.firstName && (
                            <ErrorMessage>{errors.firstName}</ErrorMessage>
                        )}
                    </FormField>

                    <FormField className="form-field">
                        <label htmlFor="dateOfBirth">Дата рождения *</label>

                        <DatePicker
                            size="large"
                            id="dateOfBirth"
                            value={values.dateOfBirth}
                            className={
                                touched.dateOfBirth && Boolean(errors.dateOfBirth)
                                    ? 'ant-picker-error'
                                    : ''
                            }
                            format={DATE_FORMAT}
                            allowClear={false}
                            style={{ width: '100%' }}
                            name="dateOfBirth"
                            placeholder="Выберете дату рождения"
                            onBlur={handleBlur}
                            onChange={(value: moment.Moment | null) => {
                                setFieldValue('dateOfBirth', value);
                            }}
                            showToday={false}
                            suffixIcon={<CalendarIcon />}
                        />

                        {errors.dateOfBirth && touched.dateOfBirth && (
                            <ErrorMessage>{errors.dateOfBirth}</ErrorMessage>
                        )}
                    </FormField>

                    <FormField className="form-field">
                        <label htmlFor="contactPhone">Телефон *</label>

                        <InputMask
                            data-error={Boolean(errors.contactPhone) && touched.contactPhone}
                            className="ant-input ant-input-lg"
                            placeholder="Введите телефон"
                            mask="+38 (999) 999-9999"
                            name="contactPhone"
                            id="contactPhone"
                            value={values.contactPhone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        {errors.contactPhone && touched.contactPhone && (
                            <ErrorMessage>{errors.contactPhone}</ErrorMessage>
                        )}
                    </FormField>

                    <FormField className="form-field">
                        <label htmlFor="consultPrice">Стоимость приема (грн) *</label>

                        <NumericInput
                            size="large"
                            data-error={Boolean(errors.consultPrice) && touched.consultPrice}
                            placeholder="Введите стоимость"
                            value={values.consultPrice}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="consultPrice"
                            id="consultPrice"
                        />

                        {errors.consultPrice && touched.consultPrice && (
                            <ErrorMessage>{errors.consultPrice}</ErrorMessage>
                        )}
                    </FormField>

                    <FormField className="form-field">
                        <label htmlFor="email">Почта *</label>

                        <Input
                            size="large"
                            data-error={Boolean(errors.email) && touched.email}
                            type="email"
                            placeholder="Введите почту"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="email"
                            id="email"
                        />

                        {errors.email && touched.email && (
                            <ErrorMessage>{errors.email}</ErrorMessage>
                        )}
                    </FormField>

                    <FormField className="form-field">
                        <label htmlFor="password">Пароль *</label>

                        <Input.Password
                            autoComplete="false"
                            size="large"
                            className={classNames({
                                error: Boolean(errors.password) && touched.password,
                            })}
                            type="password"
                            placeholder="Введите пароль"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="password"
                            id="password"
                        />

                        {errors.password && touched.password && (
                            <ErrorMessage>{errors.password}</ErrorMessage>
                        )}
                    </FormField>

                    <FormField className="form-field">
                        <label htmlFor="specialties">Специальноcть *</label>

                        <Select
                            loading={loadingFlags[fetchAllSpecialties.typePrefix]}
                            id="specialties"
                            size="large"
                            mode="multiple"
                            data-error={touched.specialties && Boolean(errors.specialties)}
                            style={{ width: '100%' }}
                            value={values.specialties}
                            placeholder="Выберете специальность(и)"
                            onChange={(value) => {
                                setFieldValue('specialties', value);
                            }}
                            onBlur={() => {
                                setFieldTouched('specialties');
                            }}
                        >
                            {specialties.map(({ id, name }) => (
                                <Option key={id} value={id}>
                                    {name}
                                </Option>
                            ))}
                        </Select>

                        {errors.specialties && touched.specialties && (
                            <ErrorMessage>{errors.specialties}</ErrorMessage>
                        )}
                    </FormField>
                </fieldset>

                <Button
                    disabled={!isValid}
                    loading={isSubmitting}
                    size="large"
                    htmlType="submit"
                    type="primary"
                >
                    Добавить врача
                </Button>
            </form>
        </div>
    );
};

export default styled(CreateDoctorPage)`
    form {
        margin-block-start: 40px;
    }

    fieldset {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .form-field {
            max-width: calc(50% - 15px);
            width: 100%;
        }
    }

    button[type='submit'] {
        display: block;
        width: calc(50% - 30px);
        margin: 20px auto 0;
    }
`;
