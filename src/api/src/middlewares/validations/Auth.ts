import { z } from 'zod';
import { ErrorValidationMiddleware } from '@validations';
import { Request, Response } from '@types';

class AuthValidationMiddleware {
  auth = (req: Request, res: Response, next: Function) => {
    try {
      const schema = z.object({
        email: z.string().email(),
        password: z.string().min(1),
      });
      schema.parse(req.body);
      next();
    } catch (err: any) {
      ErrorValidationMiddleware.handleZodError(err, res);
    }
  };
}

const instance = new AuthValidationMiddleware();

export { instance as AuthValidationMiddleware };
