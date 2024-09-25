import { Router } from 'express';
import {authenticated} from '@/middleware/auth.middleware';
import todoController from '@/controllers/todo.controller';
import validateBody from '@/middleware/validateBody';
import isExist from '@/middleware/isExist';
import ctrlWrapper from '@/helpers/ctrlWrapper';
import { todoSchema, todoUpdateSchema } from '@/models/todoSchema';
import { PrismaClient, Todo } from '@prisma/client';

const todosRouter: Router = Router();
const prisma = new PrismaClient();

todosRouter.get('/all', authenticated, ctrlWrapper(todoController.getAll.bind(todoController)));
todosRouter.get('/:id', authenticated, isExist<Todo, 'id'>(prisma.todo, 'id'), ctrlWrapper(todoController.getById.bind(todoController)));
todosRouter.post('/', authenticated, validateBody(todoSchema), ctrlWrapper(todoController.create.bind(todoController)));
todosRouter.put('/:id', authenticated, isExist<Todo, 'id'>(prisma.todo, 'id'), validateBody(todoUpdateSchema), ctrlWrapper(todoController.update.bind(todoController)));
todosRouter.delete('/:id', authenticated, isExist<Todo, 'id'>(prisma.todo, 'id'), ctrlWrapper(todoController.delete.bind(todoController)));

export default todosRouter;