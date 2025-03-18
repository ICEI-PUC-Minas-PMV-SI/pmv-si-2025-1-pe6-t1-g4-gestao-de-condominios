import { AuthRoute } from '@routes';
import { Application } from 'express';

class RouterManagement {
  register(app: Application) {
    AuthRoute.register(app);
  }
}

const instance = new RouterManagement();

export { instance as RouterManagement };
