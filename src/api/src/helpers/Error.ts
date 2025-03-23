import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from '@types';

class ErrorHelper {
  handle(error: any, res: Response) {
    console.error(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(500).json({
        error: 'PRISMA_ERROR',
        message: error.meta?.modelName + ' - ' + error.meta?.cause,
      });
    }
    if (error instanceof Error) {
      return res.status(500).json({
        error: 'OCURRED_ERROR_IN_EXECUTION',
        message: error.message,
      });
    }
    res.status(500).json({
      error: 'UNEXPECTED_ERROR',
      message: 'Unexpected error',
    });
  }
}

const instance = new ErrorHelper();

export { instance as ErrorHelper };
