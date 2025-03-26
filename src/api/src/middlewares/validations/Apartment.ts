import { Request, Response } from '@types';
import { z } from 'zod';
import { ErrorValidadtionMiddleware } from '@validations';

class ApartmentValidationMiddleware {
  create = (req: Request, res: Response, next: Function) => {
    try {
      const schema = z.object({
        number: z.number(),
        block: z.string(),
        floor: z.number(),
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
        id: z.string().cuid(),
        number: z.string(),
        block: z.string(),
        floor: z.string(),
        condominiumId: z.string().cuid(),
      });
      schema.parse({ ...req.body, ...req.params });
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

    assignUser = (req: Request, res: Response, next: Function) => {
      try {
        const paramSchema = z.object({
        id: z.string().cuid(),
      });

      const bodySchema = z.object({
        userId: z.string().cuid(),
      });

      paramSchema.parse(req.params);
      bodySchema.parse(req.body);
      next();
    } catch (err: any) {
      ErrorValidadtionMiddleware.handleZodError(err, res);
    }
  };

  unassignUser = (req: Request, res: Response, next: Function) => {
    try {
      const schema = z.object({
      id: z.string().cuid(),
      userId: z.string().cuid(),
    });

    schema.parse(req.params);
    next();
    } catch (err: any) {
      ErrorValidadtionMiddleware.handleZodError(err, res);
    }
  };
}

const instance = new ApartmentValidationMiddleware();
export { instance as ApartmentValidationMiddleware };
