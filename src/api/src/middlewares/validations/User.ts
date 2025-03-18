import { Request, Response } from '@types';
import { z } from 'zod';
import { ErrorValidadtionMiddleware } from './Error';

const profileEnum = z.enum(['ADMIN', 'MANAGER', 'RESIDENT']);

class UserValidationMiddleware {
  create = (req: Request, res: Response, next: Function) => {
    try {
      const schema = z.object({
        email: z.string().email(),
        password: z.string(),
        name: z.string(),
        profile: profileEnum,
        contactPhone: z.string().optional(),
        birthDate: z.string().date().optional(),
      });
      schema.parse(req.body);
      next();
    } catch (err: any) {
      ErrorValidadtionMiddleware.handleZodError(err, res);
    }
  };
  update = (req: Request, res: Response, next: Function) => {
    try {
      const schema = z.object({
        email: z.string().email(),
        password: z.string(),
        name: z.string(),
        profile: profileEnum,
        contactPhone: z.string().optional(),
        birthDate: z.string().date().optional(),
      });
      schema.parse(req.body);
      next();
    } catch (err: any) {
      ErrorValidadtionMiddleware.handleZodError(err, res);
    }
  };
}

const instance = new UserValidationMiddleware();
export { instance as UserValidationMiddleware };
