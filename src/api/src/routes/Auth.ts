import { AuthController } from '@controllers';
import { ErrorHelper, RequestHelper } from '@helpers';
import { Application } from 'express';
import { AuthValidationMiddleware } from '@validations';

class AuthRoute {
  register(app: Application) {
    app.post('/auth', AuthValidationMiddleware.auth, async (req, res) => {
      try {
        const token = await AuthController.auth(
          RequestHelper.getAllParams(req)
        );
        if (token) {
          res.status(200).json({
            token,
          });
        } else {
          res.status(401).json({
            message: 'UNAUTHORIZED',
          });
        }
      } catch (error: any) {
        ErrorHelper.handle(error, res);
      }
    });
  }
}
const instance = new AuthRoute();
export { instance as AuthRoute };
