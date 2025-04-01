import { Request, Response } from '@types';
import { z } from 'zod';
import { ErrorValidationMiddleware } from '@validations';

class PaymentValidationMiddleware {
  create = (req: Request, res: Response, next: Function) => {
    try {
      const schema = z.object({
        amount: z.number(),
        feeId: z.string().cuid(),
        userId: z.string().cuid(),
        apartmentId: z.string().cuid(),
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
        amount: z.number(),
        feeId: z.string().cuid(),
        userId: z.string().cuid(),
        apartmentId: z.string().cuid(),
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
  findPaymentById = (req: Request, res: Response, next: Function) => {
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

const instance = new PaymentValidationMiddleware();
export { instance as PaymentValidationMiddleware };
