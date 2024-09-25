export const ROUTER_KEYS = {
  ALL_MATCH: '/*',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  HOME: '/',
  TODOS: '/todos',
  TODO_DETAILS: (id: string) => `/todos/${id}`,
  ADD_TODO: '/todos/add',
  EDIT_TODO: (id: string) => `/todos/edit/${id}`,
  REGISTER: '/register',
  EDIT_PROFILE: '/edit-profile',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password'
};

export const STORAGE_KEYS = Object.freeze({
  TOKEN: 'TOKEN',
  USER_ID: 'USER_ID',
});

export const API_ENDPOINTS = {
  TODOS: {
    ALL: 'todos/all',
    BY_ID: (id: string) => `todos/${id}`,
    CREATE: 'todos',
    UPDATE: (id: string) => `todos/${id}`,
    DELETE: (id: string) => `todos/${id}`,
  },
  USER: {
    LOGIN: 'user/login',
    LOGOUT: 'user/logout',
    REGISTER: 'user/register',
    UPDATE_PROFILE: 'user/update-user',
    CHANGE_PASSWORD: 'user/change-password',
    FORGOT_PASSWORD: 'user/forgot-password',
    RESET_PASSWORD: 'user/reset-password'
  }
};