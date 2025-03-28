import { z } from 'zod';
import { ErrorValidadtionMiddleware } from '@validations';
import { Request, Response } from '@types';

class CondominiumValidationMiddleware {
  create = (req: Request, res: Response, next: Function) => {
    try {
      const schema = z.object({
        name: z.string().min(3),
        address: z.string().min(3),
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
        name: z.string().min(1).optional(),
        address: z.string().min(1).optional(),
      });
      schema.parse(req.body);
      next();
    } catch (err: any) {
      ErrorValidadtionMiddleware.handleZodError(err, res);
    }
  };

  find = (req: Request, res: Response, next: Function) => {
    try {
      const schema = z.object({
        id: z.string().cuid(),
      });
      schema.parse(req.params);
      next();
    } catch (err: any) {
      ErrorValidadtionMiddleware.handleZodError(err, res);
    }
  };

  delete = (req: Request, res: Response, next: Function) => {
    try {
      const schema = z.object({
        id: z.string().cuid(),
      });
      schema.parse(req.params);
      next();
    } catch (err: any) {
      ErrorValidadtionMiddleware.handleZodError(err, res);
    }
  };
}

const instance = new CondominiumValidationMiddleware();
export { instance as CondominiumValidationMiddleware };
