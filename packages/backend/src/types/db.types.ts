export type ModelDelegate<T, K extends keyof T> = {
  findUnique: (args: { where: Record<K, T[K]> }) => Promise<T | null>;
};