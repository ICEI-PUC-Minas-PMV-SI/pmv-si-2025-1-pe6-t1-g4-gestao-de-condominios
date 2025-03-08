import { Response } from '@types';

class ErrorHelper {
  handle(error: any, res: Response) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(500).json({
        errorCode: 'OCURRED_ERROR_IN_EXECUTION',
        errorMessage: error.message,
      });
    }
    res.status(500).json({
      errorCode: 'UNEXPECTED_ERROR',
      errorMessage: 'Unexpected error',
    });
  }
}

const instance = new ErrorHelper();

export { instance as ErrorHelper };
