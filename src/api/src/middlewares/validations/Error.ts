import { Response } from '@types';
import { ZodError } from 'zod';

class ErrorValidationMiddleware {
  handleZodError(err: any, res: Response) {
    if (err instanceof ZodError) {
      res.status(400).json({
        message: 'Fail to validate parameters',
        errors: err.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

const instance = new ErrorValidationMiddleware();

export { instance as ErrorValidadtionMiddleware };
