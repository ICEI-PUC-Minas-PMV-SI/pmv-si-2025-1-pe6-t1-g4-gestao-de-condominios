import express, { Application } from 'express';
import { AuthenticationMiddleware } from '@middlewares';

class MiddlewareManagement {
  register(app: Application) {
    app.use(express.json());
    app.use(AuthenticationMiddleware.register);
  }
}

const instance = new MiddlewareManagement();
export { instance as MiddlewareManagement };
