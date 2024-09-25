import http from '~/shared/services/http';
import { API_ENDPOINTS } from '~/shared/keys';
import { ITodo, CreateTodoData, UpdateTodoData } from '~/shared/services/types';

export const todoService = {
  getTodos: async (filters?: { search?: string; status?: string }, page: number = 1, limit?: number): Promise<{ todos: ITodo[], total: number }> => {
    const params = new URLSearchParams();
    
    if (filters?.search) params.append('search', filters.search);
    if (filters?.status) params.append('status', filters.status);
    params.append('page', String(page));
    if (limit) params.append('limit', String(limit));

    const response = await http.get<{ todos: ITodo[], total: number }>(`${API_ENDPOINTS.TODOS.ALL}?${params.toString()}`);
    return response.data;
  },

  createTodo: async (data: CreateTodoData): Promise<ITodo> => {
    const response = await http.post<ITodo, CreateTodoData>(API_ENDPOINTS.TODOS.CREATE, data);
    return response.data;
  },

  updateTodo: async (id: string, data: UpdateTodoData): Promise<ITodo> => {
    const response = await http.put<ITodo, UpdateTodoData>(API_ENDPOINTS.TODOS.UPDATE(id), data);
    return response.data;
  },

  deleteTodo: async (id: string): Promise<void> => {
    await http.delete<void>(API_ENDPOINTS.TODOS.DELETE(id));
  },
};
