import './AuthPage.scss';
import { memo } from 'react';
import { PageType } from 'pages/types';
import { useDispatch, useSelector } from 'store';
import { Redirect } from 'react-router-dom';
import { paths } from 'routes/paths';
import { Container } from 'shared/components/Container';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Moment } from 'moment';
import { Button, DatePicker, Input } from 'antd';
import { REGEXP_EMAIL } from 'shared/constants';
import { FormField } from 'shared/components/FormField';
import { ErrorMessage } from 'shared/components/ErrorMessage';
import styled from 'styled-components';
import classNames from 'classnames';
import { fetchSignUp } from 'store/auth/actions';

const DATE_FORMAT = 'YYYY/MM/DD';

interface SignUpFormValues {
    firstName: string;
    lastName: string;
    dateOfBirth: Moment | null;
    email: string;
    password: string;
    passwordConfirmation: string;
}

const SignUpFormSchema = Yup.object().shape({
    firstName: Yup.string().required('Имя обязательно'),
    lastName: Yup.string().required('Фамилия обязательна'),
    dateOfBirth: Yup.object()
        .nullable(true)
        .test('requiredWhenNull', 'Дата рождения обязательна', (value) => value !== null),
    email: Yup.string()
        .required('Электронна почта обязательна')
        .matches(REGEXP_EMAIL, 'Неверный формат'),
    password: Yup.string()
        .required('Пароль обязателен')
        .min(6, 'Пароль должен содержать не менее 6 символов'),
    passwordConfirmation: Yup.string()
        .required('Повторный пароль обязателен')
        .oneOf([Yup.ref('password'), null], 'Пароли не одинаковы'),
});

const SignUpPage: PageType = ({ className }) => {
    const dispatch = useDispatch();

    const isAuthorized = useSelector((state) => state.auth.isAuthorized);

    const form = useFormik<SignUpFormValues>({
        initialValues: {
            firstName: '',
            lastName: '',
            dateOfBirth: null,
            email: '',
            password: '',
            passwordConfirmation: '',
        },
        onSubmit: async ({ dateOfBirth, email, firstName, lastName, password }, { resetForm }) => {
            await dispatch(
                fetchSignUp({
                    email,
                    firstName,
                    lastName,
                    password,
                    dateOfBirth: dateOfBirth!.toISOString(),
                })
            );

            resetForm();
        },
        validationSchema: SignUpFormSchema,
    });

    if (isAuthorized) {
        return <Redirect to={paths.HOME} />;
    }
    return (
        <div
            className={classNames({ 'page auth-page sign-up-page': true, [className!]: className })}
        >
            <Container>
                <form onSubmit={form.handleSubmit}>
                    <h1>Создание аккаунта</h1>

                    <div className="form-fields">
                        <FormField>
                            <label htmlFor="firstName">Имя *</label>

                            <Input
                                size="large"
                                data-error={
                                    Boolean(form.errors.firstName) &&
                                    Boolean(form.touched.firstName)
                                }
                                placeholder="Введите имя"
                                value={form.values.firstName}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                id="firstName"
                            />

                            {form.errors.firstName && form.touched.firstName && (
                                <ErrorMessage>{form.errors.firstName}</ErrorMessage>
                            )}
                        </FormField>

                        <FormField>
                            <label htmlFor="lastName">Фамилия *</label>

                            <Input
                                size="large"
                                data-error={
                                    Boolean(form.errors.lastName) && Boolean(form.touched.lastName)
                                }
                                placeholder="Введите фамилию"
                                value={form.values.lastName}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                id="lastName"
                            />

                            {form.errors.lastName && form.touched.lastName && (
                                <ErrorMessage>{form.errors.lastName}</ErrorMessage>
                            )}
                        </FormField>

                        <FormField>
                            <label htmlFor="dateOfBirth">Дата рождения *</label>

                            <DatePicker
                                id="dateOfBirth"
                                value={form.values.dateOfBirth}
                                className={classNames({
                                    error:
                                        Boolean(form.errors.dateOfBirth) &&
                                        Boolean(form.touched.dateOfBirth),
                                })}
                                size="large"
                                style={{ width: '100%' }}
                                format={DATE_FORMAT}
                                allowClear={false}
                                placeholder="Выберете дату рождения"
                                name="dateOfBirth"
                                onBlur={form.handleBlur}
                                onChange={(value: moment.Moment | null) => {
                                    form.setFieldValue('dateOfBirth', value);
                                }}
                                showToday={false}
                            />

                            {form.errors.dateOfBirth && form.touched.dateOfBirth && (
                                <ErrorMessage>{form.errors.dateOfBirth}</ErrorMessage>
                            )}
                        </FormField>

                        <FormField>
                            <label htmlFor="email">Электронная почта *</label>

                            <Input
                                size="large"
                                data-error={
                                    Boolean(form.errors.email) && Boolean(form.touched.email)
                                }
                                type="email"
                                placeholder="Введите электронную почту"
                                value={form.values.email}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                id="email"
                            />

                            {form.errors.email && form.touched.email && (
                                <ErrorMessage>{form.errors.email}</ErrorMessage>
                            )}
                        </FormField>

                        <FormField>
                            <label htmlFor="password">Пароль *</label>

                            <Input.Password
                                size="large"
                                className={classNames({
                                    error:
                                        Boolean(form.errors.password) &&
                                        Boolean(form.touched.password),
                                })}
                                visibilityToggle={true}
                                placeholder="Введите пароль"
                                value={form.values.password}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                id="password"
                            />

                            {form.errors.password && form.touched.password && (
                                <ErrorMessage>{form.errors.password}</ErrorMessage>
                            )}
                        </FormField>

                        <FormField>
                            <label htmlFor="passwordConfirmation">Повторите пароль *</label>

                            <Input.Password
                                size="large"
                                className={classNames({
                                    error:
                                        Boolean(form.errors.passwordConfirmation) &&
                                        Boolean(form.touched.passwordConfirmation),
                                })}
                                visibilityToggle={true}
                                type="password"
                                placeholder="Повторите пароль"
                                value={form.values.passwordConfirmation}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                id="passwordConfirmation"
                            />

                            {form.errors.passwordConfirmation &&
                                form.touched.passwordConfirmation && (
                                    <ErrorMessage>{form.errors.passwordConfirmation}</ErrorMessage>
                                )}
                        </FormField>
                    </div>

                    <Button
                        size="large"
                        type="primary"
                        htmlType="submit"
                        disabled={!form.isValid}
                        loading={form.isSubmitting}
                    >
                        Создать аккаунт
                    </Button>
                </form>
            </Container>
        </div>
    );
};

export default styled(memo(SignUpPage, () => true))`
    form {
        max-width: 745px !important;

        .form-fields {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-column-gap: 25px;

            @media screen and (max-width: 768px) {
                grid-template-columns: 1fr;
            }
        }
    }
`;
