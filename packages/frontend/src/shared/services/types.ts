export interface ITodo {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export type CreateTodoData = {
  title: string;
  description?: string;
  isCompleted: boolean;
  isPrivate: boolean;
};

export type UpdateTodoData = Partial<ITodo>;

export interface ITodoStore {
  todos: ITodo[];
  total: number;
  page: number;
  limit: number;
  setPage: (page: number) => void;
  fetchTodos: (filters?: { search?: string; status?: string }, page?: number, limit?: number) => Promise<void>;
  addTodo: (todo: CreateTodoData) => Promise<void>;
  updateTodo: (id: string, todo: UpdateTodoData) => Promise<void>;
  removeTodo: (id: string) => Promise<void>;
  clearTodos: () => void;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string | null;
    avatarURL: string;
    verified: boolean;
    tokenExpiration: Date | null;
    createdAt: Date;
    updatedAt: Date;
    verificationToken: string | null;
  };
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export interface AddTodoFormValues {
  title: string;
  description: string;
  isPrivate: boolean;
}

export interface EditUserFormValues {
  name: string;
  oldPassword: string;
  newPassword: string;
}

export interface ErrorResponse {
  message: string;
}

export interface ForgotPasswordFormValues {
  email: string;
}

export interface ResetPasswordFormValues {
  newPassword: string;
}

export type HttpMethod = 'get' | 'post' | 'put' | 'delete';