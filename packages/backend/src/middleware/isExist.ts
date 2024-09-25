import { Request, Response, NextFunction } from 'express';
import { ModelDelegate } from '@/types/db.types';

const isExist = <T, K extends keyof T>(
  model: ModelDelegate<T, K>,
  field: K,
  paramName: string = 'id'
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = req.params[paramName];

      if (!value) {
        return res.status(400).json({ message: `${paramName} is required` });
      }

      const entity = await model.findUnique({
        where: { [field]: value } as Record<K, T[K]>,
      });

      if (!entity) {
        return res.status(404).json({ message: `${String(field)} ${value} not found` });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default isExist;