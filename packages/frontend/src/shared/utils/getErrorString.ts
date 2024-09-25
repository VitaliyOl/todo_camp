export const getErrorString = (error: any): string | undefined => {
  return typeof error === 'string' ? error : undefined;
};