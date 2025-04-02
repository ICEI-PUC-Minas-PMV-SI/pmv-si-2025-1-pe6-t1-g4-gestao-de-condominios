import { z } from 'zod';
import { ErrorValidationMiddleware } from '@validations';
import { Request, Response } from '@types';

class NoticeManagementValidationMiddleware {
  create = (req: Request, res: Response, next: Function) => {
    try {
      const schema = z.object({
        title: z.string().min(1, 'Title is required'),
        description: z.string().min(1, 'Description is required'),
        date: z.string().refine((val) => !isNaN(Date.parse(val)), {
          message: 'Date must be a valid datetime',
        }),
        condominiumId: z.string().cuid(),
      });
      schema.parse(req.body);
      next();
    } catch (err: any) {
      ErrorValidationMiddleware.handleZodError(err, res);
    }
  };

  update = (req: Request, res: Response, next: Function) => {
    try {
      const schema = z.object({
        title: z.string().min(1, 'Title is required').optional(),
        description: z.string().min(1, 'Description is required').optional(),
        date: z
          .string()
          .refine((val) => !isNaN(Date.parse(val)), {
            message: 'Date must be a valid datetime',
          })
          .optional(),
        condominiumId: z.string().cuid().optional(),
      });
      schema.parse(req.body);
      next();
    } catch (err: any) {
      ErrorValidationMiddleware.handleZodError(err, res);
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
      ErrorValidationMiddleware.handleZodError(err, res);
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
      ErrorValidationMiddleware.handleZodError(err, res);
    }
  };
}

const instance = new NoticeManagementValidationMiddleware();
export { instance as NoticeManagementValidationMiddleware };
