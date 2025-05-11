import { z } from 'zod';
import { ErrorValidationMiddleware } from '@validations';
import { Request, Response } from '@types';

class FeeValidationMiddleware {
  create = (req: Request, res: Response, next: Function) => {
    try {
      const schema = z.object({
        name: z.string(),
        type: z.enum(['RENT', 'CONDOMINIUM', 'OTHER']),
        due: z.string().datetime(),
        isRecurrent: z.boolean(),
        // condominiumId: z.string().cuid(),
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
        type: z.enum(['RENT', 'CONDOMINIUM', 'OTHER']),
        name: z.string(),
        due: z.string().datetime(),
        isRecurrent: z.boolean(),
        // condominiumId: z.string().cuid(),
      });
      schema.parse(req.body);
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
  findFeeById = (req: Request, res: Response, next: Function) => {
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

const instance = new FeeValidationMiddleware();
export { instance as FeeValidationMiddleware };
