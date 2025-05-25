import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from '@types';

class ErrorHelper {
  parsePrismaError(error: any): string {
    if (error instanceof PrismaClientKnownRequestError) {
      const code = error.code;
      switch (code) {
        case 'P2002': {
          const field = (error.meta?.target as string) || 'field';
          return `${field.toUpperCase()}_ALREADY_USED`;
        }
        case 'P2000':
          return 'VALUE_TOO_LONG_FOR_COLUMN';
        case 'P2001':
        case 'P2025':
          return 'RECORD_NOT_FOUND';
        case 'P2003':
          return 'FOREIGN_KEY_CONSTRAINT_FAILED';
        case 'P2004':
          return 'CONSTRAINT_FAILED';
        case 'P2005':
          return 'INVALID_COLUMN_VALUE';
        case 'P2006':
          return 'MISSING_REQUIRED_VALUE';
        case 'P2007':
          return 'DATA_VALIDATION_ERROR';
        case 'P2008':
          return 'QUERY_SYNTAX_ERROR';
        case 'P2009':
          return 'QUERY_VALIDATION_FAILED';
        case 'P2010':
          return 'RAW_QUERY_FAILED';
        case 'P2011':
          return 'NULL_CONSTRAINT_FAILED';
        case 'P2012':
          return 'MISSING_REQUIRED_FIELD';
        case 'P2013':
          return 'MISSING_ARGUMENT';
        case 'P2014':
          return 'RELATION_CONSTRAINT_FAILED';
        case 'P2016':
          return 'QUERY_INTERPRETATION_ERROR';
        case 'P2017':
          return 'MULTIPLE_RECORDS_FOUND';
        case 'P2018':
          return 'RELATION_PATH_NOT_FOUND';
        case 'P2019':
          return 'INVALID_INPUT';
        case 'P2020':
          return 'VALUE_OUT_OF_RANGE';
        case 'P2021':
          return 'TABLE_NOT_FOUND';
        case 'P2022':
          return 'COLUMN_NOT_FOUND';
        case 'P2023':
          return 'INCONSISTENT_COLUMN_DATA';
        case 'P2024':
          return 'DATABASE_TIMEOUT';
        case 'P2026':
          return 'MISSING_REQUIRED_PATH_VALUE';
        case 'P2027':
          return 'TRANSACTION_ERROR';
        case 'P2028':
          return 'QUERY_ENGINE_PANIC';
        case 'P2030':
          return 'FULLTEXT_INDEX_NOT_FOUND';
        case 'P2033':
          return 'RELATION_FIELD_NOT_FOUND';
        case 'P2034':
          return 'UNSUPPORTED_DATABASE_VERSION';
        default:
          return `PRISMA_ERROR_${code}`;
      }
    }

    return 'INTERNAL_SERVER_ERROR';
  }
  handle(error: any, res: Response) {
    console.error(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(500).json({
        error: this.parsePrismaError(error),
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
