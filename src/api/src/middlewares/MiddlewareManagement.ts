import { Application } from 'express';
import { AuthenticationMiddleware } from '@middlewares';
import bodyParser from 'body-parser';

class MiddlewareManagement {
  register(app: Application) {
    app.use(bodyParser.json());
    app.use(AuthenticationMiddleware.register);
  }
}

const instance = new MiddlewareManagement();
export { instance as MiddlewareManagement };
