import React, { useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginSchema } from '~/shared/services/validationSchemas';
import http from '~/shared/services/http';
import Button from '~shared/components/Button/Button';
import Input from '~shared/components/Input/Input';
import Form from '~shared/components/Form/Form';
import { formStyles } from './LoginForm.styles';
import { ROUTER_KEYS, API_ENDPOINTS } from '~shared/keys';
import { useCustomFormik } from '~/hooks/useCustomFormik';
import { LoginFormValues } from '~/shared/services/types';
import { loginInitialValues } from '~/shared/services/initialValues';
import { useAuthStore } from "~/store/auth.store";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleOnSubmit = useCallback(
    async (values: LoginFormValues) => {
      const response = await http.login<LoginFormValues>(API_ENDPOINTS.USER.LOGIN, values);      
      useAuthStore.getState().setAuth(response.data.token, response.data.user.id.toString());
      navigate(ROUTER_KEYS.TODOS);
    },
    [navigate]
  );

  const handleBackToHome = useCallback(() => {
    navigate(ROUTER_KEYS.HOME);
  }, [navigate]);

  const { formik, errorMessage, setErrorMessage } = useCustomFormik<LoginFormValues>({
    initialValues: loginInitialValues,
    validationSchema: loginSchema,
    onSubmit: handleOnSubmit,
  });

  useEffect(() => {
    if (location.state && location.state.registered) {
      setErrorMessage('Verification email sent. Please check your email to verify your account.');
    }
  }, [location, setErrorMessage]); 

  return (
    <>
    <Form id="login-form" onSubmit={formik.handleSubmit} className={formStyles}>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <Input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
      />
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
      />
      <Button
        type="submit"
        variant="primary"
        disabled={formik.isSubmitting || !formik.isValid}
      >
        Submit
      </Button>
    </Form>
      
      <Button variant="primary" onClick={handleBackToHome}>
        Back to Home
      </Button>
    </>
  );
};

export default LoginForm;