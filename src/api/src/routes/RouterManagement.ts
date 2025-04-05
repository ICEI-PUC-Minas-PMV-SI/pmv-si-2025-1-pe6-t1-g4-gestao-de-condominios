import {
  AuthRoute,
  UserRoute,
  ApartmentRoute,
  CondominiumRoute,
  CommonAreaRoute,
  FeeRoute,
  PaymentRoute,
  NoticeManagementRoute,
  MessageRoute,
} from '@routes';
import { Application } from 'express';

class RouterManagement {
  register(app: Application) {
    AuthRoute.register(app);
    UserRoute.register(app);
    ApartmentRoute.register(app);
    CondominiumRoute.register(app);
    CommonAreaRoute.register(app);
    FeeRoute.register(app);
    PaymentRoute.register(app);
    NoticeManagementRoute.register(app);
    MessageRoute.register(app);
  }
}

const instance = new RouterManagement();

export { instance as RouterManagement };
