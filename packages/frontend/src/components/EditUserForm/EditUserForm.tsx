import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '~/shared/services/http';
import Button from '~shared/components/Button/Button';
import Input from '~shared/components/Input/Input';
import Form from '~shared/components/Form/Form';
import { formStyles } from './EditUserForm.styles';
import { ROUTER_KEYS, API_ENDPOINTS } from '~shared/keys';
import { editProfileSchema } from '~/shared/services/validationSchemas';
import { useCustomFormik } from '~/hooks/useCustomFormik';
import { EditUserFormValues } from '~/shared/services/types';
import { editUserInitialValues } from '~/shared/services/initialValues';

const EditUserForm: React.FC = () => {
  const navigate = useNavigate();

  const handleEditUser = useCallback(
    async (values: EditUserFormValues) => {
      await http.put(API_ENDPOINTS.USER.UPDATE_PROFILE, { name: values.name });
      await http.post(API_ENDPOINTS.USER.CHANGE_PASSWORD, {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });

      setErrorMessage(null);
      alert('Profile updated successfully!');
      navigate(ROUTER_KEYS.TODOS);
    },
    [navigate]
  );

  const { formik, errorMessage, setErrorMessage } = useCustomFormik<EditUserFormValues>({
    initialValues: editUserInitialValues,
    validationSchema: editProfileSchema,
    onSubmit: handleEditUser,
  });

  const handleBackToHome = useCallback(() => {
    navigate(ROUTER_KEYS.TODOS);
  }, [navigate]);

  return (
    <>
      <Form id="edit-profile-form" onSubmit={formik.handleSubmit} className={formStyles}>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="New Username"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name ? formik.errors.name : undefined}
        />
        <Input
          type="password"
          id="oldPassword"
          name="oldPassword"
          placeholder="Current Password"
          value={formik.values.oldPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.oldPassword ? formik.errors.oldPassword : undefined}
        />
        <Input
          type="password"
          id="newPassword"
          name="newPassword"
          placeholder="New Password"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.newPassword ? formik.errors.newPassword : undefined}
        />
        <Button type="submit" variant="primary" disabled={formik.isSubmitting || !formik.isValid}>
          Save Changes
        </Button>
      </Form>

      <Button variant="primary" onClick={handleBackToHome}>
        Back to Home
      </Button>
    </>
  );
};

export default EditUserForm;