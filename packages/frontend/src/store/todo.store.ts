import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { todoService } from '~/shared/services/todo.service';
import { ITodoStore, CreateTodoData, UpdateTodoData } from '~/shared/services/types';

const useTodoStore = create<ITodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      total: 0,
      page: 1,
      limit: 6,

      setPage: (page) => set({ page }),

      fetchTodos: async (filters: { search?: string; status?: string } = {}, pageOverride?: number, limitOverride?: number) => {
          const { page, limit } = get();
          const currentPage = pageOverride ?? page;
          const currentLimit = limitOverride ?? limit;

          try {
            const response = await todoService.getTodos(filters, currentPage, currentLimit);
            set({ todos: response.todos, total: response.total });
          } catch (error) {
            console.error('Failed to fetch todos:', error);
          }
      },

      addTodo: async (todo: CreateTodoData) => {
        try {
          const newTodo = await todoService.createTodo(todo);
          set((state) => ({ todos: [...state.todos, newTodo] }));
        } catch (error) {
          console.error('Failed to add todo:', error);
        }
      },

      updateTodo: async (id: string, todo: UpdateTodoData) => {
        try {
          const updatedTodo = await todoService.updateTodo(id, todo);
          set((state) => ({
            todos: state.todos.map((t) => (t.id === id ? { ...t, ...updatedTodo } : t)),
          }));
        } catch (error) {
          console.error('Failed to update todo:', error);
        }
      },

      removeTodo: async (id: string) => {
        try {
          await todoService.deleteTodo(id);
          set((state) => ({
            todos: state.todos.filter((t) => t.id !== id),
          }));
        } catch (error) {
          console.error('Failed to delete todo:', error);
        }
      },
      clearTodos: () => set({ todos: [], total: 0, page: 1, limit: 6 }),
    }),
    {
      name: 'todos',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTodoStore;
