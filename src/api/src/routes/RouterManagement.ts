import { AuthRoute, UserRoute } from '@routes';
import { Application } from 'express';

class RouterManagement {
  register(app: Application) {
    AuthRoute.register(app);
    UserRoute.register(app);
  }
}

const instance = new RouterManagement();

export { instance as RouterManagement };
