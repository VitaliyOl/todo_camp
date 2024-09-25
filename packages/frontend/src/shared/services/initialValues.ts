import { LoginFormValues, RegisterFormValues, AddTodoFormValues, EditUserFormValues } from '~/shared/services/types';

export const loginInitialValues: LoginFormValues = {
  email: '',
  password: '',
};

export const registerInitialValues: RegisterFormValues = {
  name: '',
  email: '',
  password: '',
};

export const addTodoInitialValues: AddTodoFormValues = {
  title: '',
  description: '',
  isPrivate: false,
};

export const editUserInitialValues: EditUserFormValues = {
  name: '',
  oldPassword: '',
  newPassword: '',
};

export const forgotPasswordInitialValues = {
  email: '',
};

export const resetPasswordInitialValues = {
  newPassword: '',
};