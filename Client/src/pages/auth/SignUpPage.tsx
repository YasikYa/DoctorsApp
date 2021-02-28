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
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    dateOfBirth: Yup.object()
        .nullable(true)
        .test('requiredWhenNull', 'Date is required', (value) => (value === null ? false : true)),
    email: Yup.string().required('Email required').matches(REGEXP_EMAIL, 'Invalid email address'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must contain at least 6 characters'),
    passwordConfirmation: Yup.string()
        .required('Repeat password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const SignUpPage: PageType = ({ className }) => {
    const dispatch = useDispatch();

    const { isAuthorized } = useSelector((state) => ({ isAuthorized: state.auth.isAuthorized }));

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
                    <h1>Create account</h1>

                    <div className="form-fields">
                        <FormField>
                            <label htmlFor="firstName">First name *</label>

                            <Input
                                size="large"
                                data-error={
                                    Boolean(form.errors.firstName) &&
                                    Boolean(form.touched.firstName)
                                }
                                placeholder="Enter first name"
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
                            <label htmlFor="lastName">Last name *</label>

                            <Input
                                size="large"
                                data-error={
                                    Boolean(form.errors.lastName) && Boolean(form.touched.lastName)
                                }
                                placeholder="Enter last name"
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
                            <label htmlFor="dateOfBirth">Date of birth *</label>

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
                                placeholder="Choose date"
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
                            <label htmlFor="email">Email *</label>

                            <Input
                                size="large"
                                data-error={
                                    Boolean(form.errors.email) && Boolean(form.touched.email)
                                }
                                type="email"
                                placeholder="Enter email"
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
                            <label htmlFor="password">Password *</label>

                            <Input.Password
                                size="large"
                                className={classNames({
                                    error:
                                        Boolean(form.errors.password) &&
                                        Boolean(form.touched.password),
                                })}
                                visibilityToggle={true}
                                placeholder="Enter password"
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
                            <label htmlFor="passwordConfirmation">Repeat password *</label>

                            <Input.Password
                                size="large"
                                className={classNames({
                                    error:
                                        Boolean(form.errors.passwordConfirmation) &&
                                        Boolean(form.touched.passwordConfirmation),
                                })}
                                visibilityToggle={true}
                                type="password"
                                placeholder="Repeat password"
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
                        Sign up
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
