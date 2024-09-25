import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Please provide a valid email').required('Email is required'),
  password: Yup.string().min(3, 'Password should have a minimum length of 3').required('Password is required'),  
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Please provide a valid email').required('Email is required'),
  password: Yup.string().min(3, 'Password should have a minimum length of 3').required('Password is required'),
});

export const addFormSchema = Yup.object({
  title: Yup.string().max(50, 'Title must be 50 characters or less').required('Required'),
  description: Yup.string().max(200, 'Description must be 200 characters or less').required('Required'),
});

export const updateUserSchema = Yup.object().shape({
   name: Yup.string().required('Name is required'),
});

export const editProfileSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  oldPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string().min(3, 'New password must be at least 3 characters').required('New password is required'),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Please provide a valid email').required('Email is required'),
});

export const resetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string().min(3, 'Password must be at least 3 characters long').required('Password is required'),
});