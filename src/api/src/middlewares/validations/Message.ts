import { Request, Response } from '@types';
import { z } from 'zod';
import { ErrorValidationMiddleware } from '@validations';

class MessageValidationMiddleware {

  send = (req: Request, res: Response, next: Function) => {
    try {
      const schema = z.object({
        token: z.string().min(1, "O token do dispositivo é obrigatório"),
        body: z.string().min(2, "O corpo da notificação deve ter pelo menos 3 caracteres"),
      });

      schema.parse(req.body);
      next();
    } catch (err: any) {
      ErrorValidationMiddleware.handleZodError(err, res);
    }
  };

  create = (req: Request, res: Response, next: Function) => {
    try {
      const schema = z.object({
        senderId: z.string().cuid(),
        receiverId: z.string().cuid(),
        content: z.string().min(1, 'A mensagem não pode estar vazia'),
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

  markAsRead = (req: Request, res: Response, next: Function) => {
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

const instance = new MessageValidationMiddleware();
export { instance as MessageValidationMiddleware };
