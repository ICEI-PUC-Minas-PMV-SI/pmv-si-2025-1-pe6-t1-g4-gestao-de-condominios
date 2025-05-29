import express, { Application } from 'express';
import { AuthenticationMiddleware } from '@middlewares';
import { DataHandlerMiddleware } from './DataHandler';

class MiddlewareManagement {
  register(app: Application) {
    app.use(express.json());
    app.use(AuthenticationMiddleware.register);
    app.use(DataHandlerMiddleware.register);
  }
}

const instance = new MiddlewareManagement();
export { instance as MiddlewareManagement };
