import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerSchema } from '~/shared/services/validationSchemas';
import http from '~/shared/services/http';
import Button from '~/shared/components/Button/Button';
import Input from '~/shared/components/Input/Input';
import Form from '~/shared/components/Form/Form';
import { formStyles } from './RegisterForm.styles';
import { useCustomFormik } from '~/hooks/useCustomFormik';
import { RegisterFormValues } from '~/shared/services/types';
import { ROUTER_KEYS, API_ENDPOINTS } from '~shared/keys';
import { registerInitialValues } from '~/shared/services/initialValues';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = useCallback(
    async (values: RegisterFormValues) => {
      await http.post(API_ENDPOINTS.USER.REGISTER, values);
      navigate(ROUTER_KEYS.LOGIN, { state: { registered: true } });
    },
    [navigate]
  );

  const handleBackToHome = useCallback(() => {
    navigate(ROUTER_KEYS.HOME);
  }, [navigate]);

  const { formik, errorMessage } = useCustomFormik<RegisterFormValues>({
    initialValues: registerInitialValues,
    validationSchema: registerSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
    <Form id="register-form" onSubmit={formik.handleSubmit} className={formStyles}>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <Input
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name ? formik.errors.name : undefined}
      />
      <Input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email ? formik.errors.email : undefined}
      />
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password ? formik.errors.password : undefined}
      />
      <Button type="submit" variant="primary" disabled={formik.isSubmitting || !formik.isValid}>
        Register
      </Button>
    </Form>
      
      <Button variant="primary" onClick={handleBackToHome}>
        Back to Home
      </Button>
    </>
  );
};

export default RegisterForm;