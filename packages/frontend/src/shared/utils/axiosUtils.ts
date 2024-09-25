import { AxiosError } from 'axios';

export const isAxiosError = <T = unknown>(error: unknown): error is AxiosError<T> => {
  return (error as AxiosError<T>).isAxiosError !== undefined;
};