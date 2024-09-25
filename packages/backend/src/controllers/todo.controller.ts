import { Response, Request } from 'express';
import TodoService from '@/services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAll(req: Request, res: Response): Promise<void> {
    const search = typeof req.query.search === 'string' ? req.query.search : undefined;
    const status = typeof req.query.status === 'string' ? req.query.status : undefined;
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;

    const { todos, total } = await this.todoService.findAll(req.user!.id, { search, status }, page, limit);
    res.status(200).json({ todos, total, page, limit });
  }

  async getById(req: Request, res: Response): Promise<void> {
    const todo = await this.todoService.findById(req.params.id, req.user!.id);
    res.status(200).json(todo);
  }

  async create(req: Request, res: Response): Promise<void> {
    const todo = await this.todoService.create(req.user!.id, req.body);
    res.status(201).json(todo);
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updateData = req.body;
    const { createdAt, ...fieldsToUpdate } = updateData;

    const todo = await this.todoService.update(id, req.user!.id, fieldsToUpdate);
    res.status(200).json(todo);
  }

  async delete(req: Request, res: Response): Promise<void> {
    await this.todoService.delete(req.params.id, req.user!.id);
    res.status(204).send();
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;