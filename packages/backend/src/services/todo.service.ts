import { PrismaClient, Todo, Prisma } from '@prisma/client';
import { TodoFilters } from "@/types/todos.type";

const prisma = new PrismaClient();

export default class TodoService {
  
  async findAll(userId: number, filters?: TodoFilters, page: number = 1, limit: number = 10): Promise<{ todos: Todo[], total: number }> {
   
    const whereClause: Prisma.TodoWhereInput = {
      OR: [{ userId }, { isPrivate: false }],
      ...(filters?.search && {
        title: { contains: filters.search, mode: 'insensitive' },
      }),
      ...(filters?.status === 'completed' && { isCompleted: true }),
      ...(filters?.status === 'private' && { isPrivate: true }),
      ...(filters?.status === 'public' && { isPrivate: false }),
        };    
    
    const skip = (page - 1) * limit;
    const take = limit;
    
    const todos = await prisma.todo.findMany({
      where: whereClause,
      skip,
      take,
    });
    
    const total = await prisma.todo.count({
      where: whereClause,
    });

    return { todos, total };
  }
  
  async findById(id: string, userId: number): Promise<Todo | null> {
    return prisma.todo.findFirst({
      where: {
        id,
        OR: [
          { userId },
          { isPrivate: false },
        ],
      },
    });
  }
  
  async create(userId: number, data: Prisma.TodoCreateInput): Promise<Todo> {
    return prisma.todo.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      },
    });
  }
  
  async update(id: string, userId: number, data: Prisma.TodoUpdateInput): Promise<Todo | null> {
      const todo = await prisma.todo.findFirst({
        where: { id, userId },
      });

      if (!todo) return null;

      return prisma.todo.update({
        where: { id },
        data,
      });
  }
  
  async delete(id: string, userId: number): Promise<Todo | null> {
      const todo = await prisma.todo.findFirst({
        where: { id, userId },
      });

      if (!todo) return null;

      return prisma.todo.delete({
        where: { id },
      });
  }
}