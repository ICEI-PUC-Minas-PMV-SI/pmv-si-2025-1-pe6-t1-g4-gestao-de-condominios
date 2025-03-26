import { Request, Response } from '@types';
import { z } from 'zod';
import { ErrorValidadtionMiddleware } from '@validations';

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
        birthDate: z.coerce.date().optional(),
      });
      schema.parse(req.body);
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
  findUserById = (req: Request, res: Response, next: Function) => {
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
  forgotPassword = (req: Request, res: Response, next: Function) => {
    try {
      const schema = z.object({
        email: z.string().email(),
      });
      schema.parse(req.body);
      next();
    } catch (err: any) {
      ErrorValidadtionMiddleware.handleZodError(err, res);
    }
  };
  validateOTP = (req: Request, res: Response, next: Function) => {
    try {
      const schema = z.object({
        email: z.string().email(),
        otp: z.string().regex(/\d{6}/g),
      });
      schema.parse(req.body);
      next();
    } catch (err: any) {
      ErrorValidadtionMiddleware.handleZodError(err, res);
    }
  };
  resetPassword = (req: Request, res: Response, next: Function) => {
    try {
      const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).+$/g;
      const passwordMessage =
        'The field must contain at least one uppercase letter, one lowercase letter, one number, and one symbol.';
      const schema = z.object({
        newPassword: z.string().min(8).regex(passwordPattern, passwordMessage),
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
