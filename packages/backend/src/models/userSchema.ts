import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required',
  }),
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
  }),
  password: Joi.string().min(3).required().messages({
    'string.min': 'Password should have a minimum length of 3',
    'any.required': 'Password is required',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(3).required().messages({
    'string.min': 'Password should have a minimum length of 3',
    'any.required': 'Password is required',
  }),
});

export const resendVerificationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required',
  }),
});

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().min(3).required().messages({
    'string.min': 'Old password should have a minimum length of 3',
    'any.required': 'Old password is required',
  }),
  newPassword: Joi.string().min(3).required().messages({
    'string.min': 'New password should have a minimum length of 3',
    'any.required': 'New password is required',
  }),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required',
  }),
});

export const resetPasswordSchema = Joi.object({
  token: Joi.string().required().messages({
    'any.required': 'Reset token is required',
  }),
  newPassword: Joi.string().min(3).required().messages({
    'string.min': 'New password should have a minimum length of 3',
    'any.required': 'New password is required',
  }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
  }),
});