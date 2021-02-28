import './AuthPage.scss';
import React, { memo } from 'react';
import { PageType } from 'pages/types';
import { useDispatch, useSelector } from 'store';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { REGEXP_EMAIL } from 'shared/constants';
import { Input, Button, Checkbox } from 'antd';
import { ErrorMessage } from 'shared/components/ErrorMessage';
import { FormField } from 'shared/components/FormField';
import { Container } from 'shared/components/Container';
import { fetchLogin } from 'store/auth/actions';
import { Redirect } from 'react-router-dom';
import { paths } from 'routes/paths';

interface LoginFormValues {
    email: string;
    password: string;
    rememberMe: boolean;
}

const LoginFormSchema = Yup.object().shape({
    password: Yup.string().required('Password required'),
    email: Yup.string().required('Email required').matches(REGEXP_EMAIL, 'Invalid email address'),
});

const LoginPage: PageType = () => {
    const dispatch = useDispatch();

    const { isAuthorized } = useSelector((state) => ({ isAuthorized: state.auth.isAuthorized }));

    const form = useFormik<LoginFormValues>({
        initialValues: {
            email: '',
            password: '',
            rememberMe: true,
        },
        onSubmit: async ({ email, password, rememberMe }) => {
            await dispatch(
                fetchLogin({
                    email,
                    password,
                    rememberMe,
                })
            );
        },
        validationSchema: LoginFormSchema,
    });

    if (isAuthorized) {
        return <Redirect to={paths.HOME} />;
    }
    return (
        <div className="page auth-page login-page">
            <Container>
                <form onSubmit={form.handleSubmit}>
                    <h1>Account login</h1>

                    <FormField>
                        <label htmlFor="email">Email *</label>

                        <Input
                            size="large"
                            data-error={Boolean(form.errors.email) && Boolean(form.touched.email)}
                            type="email"
                            placeholder="Enter email"
                            value={form.values.email}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            name="email"
                            id="email"
                        />

                        {form.errors.email && form.touched.email && (
                            <ErrorMessage>{form.errors.email}</ErrorMessage>
                        )}
                    </FormField>

                    <FormField>
                        <label htmlFor="password">Password *</label>

                        <Input
                            autoComplete="false"
                            size="large"
                            data-error={
                                Boolean(form.errors.password) && Boolean(form.touched.password)
                            }
                            type="password"
                            placeholder="Enter password"
                            value={form.values.password}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            name="password"
                            id="password"
                        />

                        {form.errors.password && form.touched.password && (
                            <ErrorMessage>{form.errors.password}</ErrorMessage>
                        )}
                    </FormField>

                    <Checkbox
                        style={{ fontSize: 16 }}
                        className="checkbox"
                        name="rememberMe"
                        checked={form.values.rememberMe}
                        onChange={form.handleChange}
                    >
                        Remember me
                    </Checkbox>

                    <Button
                        size="large"
                        type="primary"
                        htmlType="submit"
                        disabled={!form.isValid}
                        loading={form.isSubmitting}
                    >
                        Log in now
                    </Button>
                </form>
            </Container>
        </div>
    );
};

export default memo(LoginPage, () => true);
