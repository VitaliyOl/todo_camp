import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { LoginResponse } from './types';
import { useAuthStore } from "~/store/auth.store";
import useTodoStore from "~/store/todo.store";
import { HttpMethod } from '~/shared/services/types';
import { API_ENDPOINTS } from '~shared/keys';

class Http {
  private fetchingService: AxiosInstance;

  constructor(
    private baseUrl: string = import.meta.env.VITE_API_URL || 'http://localhost:3030',
    private apiVersion: string = 'api'
  ) {
    this.fetchingService = axios.create({
      baseURL: `${this.baseUrl}/${this.apiVersion}`,
    });
    
    this.setAuthorizationHeader();
  }

  private setAuthorizationHeader(): void {
    const token = useAuthStore.getState().token;
    if (token) {
      this.fetchingService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.fetchingService.defaults.headers.common['Authorization'];
    }
  }
  
  private handleRequest<T>(method: HttpMethod, url: string, data?: any, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    return this.fetchingService[method](url, data, config);
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.handleRequest<T>('get', url, undefined, config);
  }

  post<T, U>(url: string, data: U, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.handleRequest<T>('post', url, data, config);
  }

  put<T, U>(url: string, data: U, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.handleRequest<T>('put', url, data, config);
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.handleRequest<T>('delete', url, undefined, config);
  }

  async login<U>(url: string, data: U): Promise<AxiosResponse<LoginResponse>> {
    const response = await this.post<LoginResponse, U>(url, data);
    
    if (response.data && response.data.token) {
      useAuthStore.getState().setAuth(response.data.token, response.data.user.id.toString());
      this.setAuthorizationHeader();
    }
    return response;
  }

  async logout(): Promise<void> {
    try {
      await this.post(API_ENDPOINTS.USER.LOGOUT, {});
      useAuthStore.getState().clearAuth();
       useTodoStore.getState().clearTodos();
      this.setAuthorizationHeader();
    } catch (error) {
      console.error('Logout failed:', error); 
    }
  }
}

const http = new Http();
export default http;