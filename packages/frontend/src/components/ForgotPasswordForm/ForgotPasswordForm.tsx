import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '~/shared/services/http';
import Button from '~shared/components/Button/Button';
import Input from '~shared/components/Input/Input';
import Form from '~shared/components/Form/Form';
import { formStyles } from './ForgotPasswordForm.styles';
import { ROUTER_KEYS, API_ENDPOINTS } from '~shared/keys';
import { forgotPasswordSchema } from '~/shared/services/validationSchemas';
import { useCustomFormik } from '~/hooks/useCustomFormik';
import { ForgotPasswordFormValues } from '~/shared/services/types';
import { forgotPasswordInitialValues } from '~/shared/services/initialValues';

const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleForgotPassword = useCallback(
    async (values: ForgotPasswordFormValues) => {
      try {
        await http.post(API_ENDPOINTS.USER.FORGOT_PASSWORD, { email: values.email });
        alert('Password reset link sent to your email!');
        setErrorMessage(null);
        navigate(ROUTER_KEYS.LOGIN);
      } catch (error) {
        setErrorMessage('Failed to send reset link. Please try again.');
      }
    },
    [navigate]
  );

  const { formik } = useCustomFormik<ForgotPasswordFormValues>({
    initialValues: forgotPasswordInitialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: handleForgotPassword,
  });

  return (
    <>
      <Form id="forgot-password-form" onSubmit={formik.handleSubmit} className={formStyles}>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email ? formik.errors.email : undefined}
        />
        <Button type="submit" variant="primary" disabled={formik.isSubmitting || !formik.isValid}>
          Reset Password
        </Button>
      </Form>

      <Button variant="primary" onClick={() => navigate(ROUTER_KEYS.LOGIN)}>
        Back to Login
      </Button>
    </>
  );
};

export default ForgotPasswordForm;
