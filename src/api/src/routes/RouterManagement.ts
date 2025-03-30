import {
  AuthRoute,
  UserRoute,
  ApartmentRoute,
  CondominiumRoute,
  CommonAreaRoute,
  TaxRoute,
  PaymentRoute,
} from '@routes';
import { Application } from 'express';

class RouterManagement {
  register(app: Application) {
    AuthRoute.register(app);
    UserRoute.register(app);
    ApartmentRoute.register(app);
    CondominiumRoute.register(app);
    CommonAreaRoute.register(app);
    TaxRoute.register(app);
    PaymentRoute.register(app);
  }
}

const instance = new RouterManagement();

export { instance as RouterManagement };
