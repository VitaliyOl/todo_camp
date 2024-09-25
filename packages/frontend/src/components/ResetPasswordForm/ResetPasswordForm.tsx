import React, { useCallback, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import http from '~/shared/services/http';
import Button from '~shared/components/Button/Button';
import Input from '~shared/components/Input/Input';
import Form from '~shared/components/Form/Form';
import { formStyles } from './ResetPasswordForm.styles';
import { resetPasswordSchema } from '~/shared/services/validationSchemas';
import { useCustomFormik } from '~/hooks/useCustomFormik';
import { ResetPasswordFormValues } from '~/shared/services/types';
import { resetPasswordInitialValues } from '~/shared/services/initialValues';
import { API_ENDPOINTS, ROUTER_KEYS } from '~shared/keys';

const ResetPasswordForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

const handleResetPassword = useCallback(
  async (values: ResetPasswordFormValues) => {
    if (!token) {
      setErrorMessage('Invalid or missing reset token');
      return;
    }

    try {
      await http.post(API_ENDPOINTS.USER.RESET_PASSWORD, { token, newPassword: values.newPassword });
      alert('Password reset successfully!');
      setErrorMessage(null);
      navigate(ROUTER_KEYS.LOGIN);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {        
        if (error.response.data.message === 'New password cannot be the same as the old password') {
          setErrorMessage('New password cannot be the same as the old password.');
        } else {
          setErrorMessage('Failed to reset password. Please check your input.');
        }
      } else {
        setErrorMessage('Failed to reset password. Please try again.');
      }
    }
  },
  [token, navigate]
);


  const { formik } = useCustomFormik<ResetPasswordFormValues>({
    initialValues: resetPasswordInitialValues,
    validationSchema: resetPasswordSchema,
    onSubmit: handleResetPassword,
  });

  return (
    <>
      <Form id="reset-password-form" onSubmit={formik.handleSubmit} className={formStyles}>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <Input
          type="password"
          id="newPassword"
          name="newPassword"
          placeholder="Enter your new password"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.newPassword ? formik.errors.newPassword : undefined}
        />
        <Button type="submit" variant="primary" disabled={formik.isSubmitting || !formik.isValid}>
          Reset Password
        </Button>
      </Form>
    </>
  );
};

export default ResetPasswordForm;
