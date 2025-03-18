import { AuthController } from '@controllers';
import { ErrorHelper, RequestHelper } from '@helpers';
import { Application } from 'express';

class AuthRoute {
  register(app: Application) {
    app.post('/auth', (req, res) => {
      try {
        const token = AuthController.auth(RequestHelper.getAllParams(req));
        res.status(200).json({
          token,
        });
      } catch (error: any) {
        ErrorHelper.handle(error, res);
      }
    });
  }
}
const instance = new AuthRoute();
export { instance as AuthRoute };
