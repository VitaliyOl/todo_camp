import Joi from 'joi';

export const todoSchema = Joi.object({
  id: Joi.string().guid({ version: ['uuidv4'] }).optional(), 
  title: Joi.string().min(3).max(100).required(), 
  description: Joi.string().min(10).max(255).optional().allow(null).required(),
  isCompleted: Joi.boolean().default(false),
  isPrivate: Joi.boolean().default(false),
});

export const todoUpdateSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(10).max(255).optional().allow(null),
  isCompleted: Joi.boolean().optional(),
  isPrivate: Joi.boolean().optional(),
});