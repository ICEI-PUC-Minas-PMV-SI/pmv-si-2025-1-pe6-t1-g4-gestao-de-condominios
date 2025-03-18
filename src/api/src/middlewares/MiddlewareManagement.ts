import { Application } from 'express';
import { AuthMiddleware } from '@middlewares';
import bodyParser from 'body-parser';

class MiddlewareManagement {
  register(app: Application) {
    app.use(bodyParser.json());
    app.use(AuthMiddleware.register);
  }
}

const instance = new MiddlewareManagement();
export { instance as MiddlewareManagement };
