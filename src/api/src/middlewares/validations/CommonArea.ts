import { z } from 'zod';
import { ErrorValidadtionMiddleware } from '@validations';
import { Request, Response } from '@types';

class CommonAreaValidationMiddleware {
  create = (req: Request, res: Response, next: Function) => {
    try {
      const schema = z.object({
        type: z.enum(['PARKING', 'BARBECUE', 'COURT', 'PARTY_ROOM', 'OTHER']),
        quantity: z.number().int().positive(),
        condominiumId: z.string().cuid(),
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
        type: z.enum(['PARKING', 'BARBECUE', 'COURT', 'PARTY_ROOM', 'OTHER']).optional(),
        quantity: z.number().int().positive().optional(),
        condominiumId: z.string().cuid().optional(),
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

const instance = new CommonAreaValidationMiddleware();
export { instance as CommonAreaValidationMiddleware };
