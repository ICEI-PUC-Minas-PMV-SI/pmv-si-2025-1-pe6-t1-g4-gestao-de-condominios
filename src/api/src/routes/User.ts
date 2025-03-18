import { UserController } from '@controllers';
import { ErrorHelper, RequestHelper } from '@helpers';
import { Application } from 'express';
import { UserValidationMiddleware } from '@validations';
import { AuthorizationMiddleware } from '@middlewares';

class UserRoute {
  register(app: Application) {
    app.post('/users', UserValidationMiddleware.create, async (req, res) => {
      try {
        const user = await UserController.create(
          RequestHelper.getAllParams(req)
        );
        res.status(201).json({
          user,
        });
      } catch (error: any) {
        ErrorHelper.handle(error, res);
      }
    });
    app.get('/users', async (req, res) => {
      try {
        const users = await UserController.listAll();
        res.status(200).json({
          users,
        });
      } catch (error: any) {
        ErrorHelper.handle(error, res);
      }
    });
    app.get('/users/:id', async (req, res) => {
      try {
        const user = await UserController.find(RequestHelper.getAllParams(req));
        if (user) {
          res.status(200).json({
            user,
          });
        } else {
          res.status(404).json();
        }
      } catch (error: any) {
        ErrorHelper.handle(error, res);
      }
    });
    app.put('/users/:id', UserValidationMiddleware.update, async (req, res) => {
      try {
        const user = await UserController.update(
          RequestHelper.getAllParams(req)
        );
        if (user) {
          res.status(200).json();
        } else {
          res.status(404).json();
        }
      } catch (error: any) {
        ErrorHelper.handle(error, res);
      }
    });
    app.delete(
      '/users/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      async (req, res) => {
        try {
          const deletedUser = await UserController.delete(
            RequestHelper.getAllParams(req)
          );
          if (deletedUser) {
            res.status(204).json();
          } else {
            res.status(404).json();
          }
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      }
    );
  }
}
const instance = new UserRoute();
export { instance as UserRoute };
