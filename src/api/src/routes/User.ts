import { UserController } from '@controllers';
import { ErrorHelper, RequestHelper } from '@helpers';
import { Application } from 'express';
import { UserValidationMiddleware } from '@validations';
import { AuthorizationMiddleware } from '@middlewares';
import { JWT } from '@utilities';
import { Request } from '@types';

class UserRoute {
  register(app: Application) {
    app.post(
      '/users',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      UserValidationMiddleware.create,
      async (req, res) => {
        /*
          #swagger.tags = ['Users']
          #swagger.summary = 'Create a user'
          #swagger.description = 'This endpoint creates a new user.'
          #swagger.requestBody = {
            $ref: '#/components/custom-schemas/UserCreate'
          }
        */
        try {
          const { session, ...data } = RequestHelper.getAllParams(req);
          const user = await UserController.create(data);
          res.status(201).json({
            user,
          });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );
    app.get('/users', AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']), async (req, res) => {
      /*
          #swagger.tags = ['Users']
          #swagger.summary = 'Retrieve all users'
          #swagger.description = 'This endpoint returns a list of all users.'
        */
      try {
        const users = await UserController.listAll();
        res.status(200).json(users);
      } catch (error: any) {
        ErrorHelper.handle(error, res);
      }
    });
    app.get('/users/:id', UserValidationMiddleware.findUserById, async (req, res) => {
      /*
        #swagger.tags = ['Users']
        #swagger.summary = 'Retrieve a user by ID'
        #swagger.description = 'This endpoint returns a user by their ID.'
      */
      try {
        const user = await UserController.find(RequestHelper.getAllParams(req));
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json();
        }
      } catch (error: any) {
        ErrorHelper.handle(error, res);
      }
    });
    app.put('/users/:id', UserValidationMiddleware.update, async (req, res) => {
      try {
        /*
          #swagger.tags = ['Users']
          #swagger.summary = 'Update a user'
          #swagger.description = 'This endpoint updates an existing user.'
          #swagger.requestBody = {
            $ref: '#/components/custom-schemas/UserUpdate'
          }
        */
        const user = await UserController.update(RequestHelper.getAllParams(req));
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
      UserValidationMiddleware.delete,
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      async (req, res) => {
        /*
          #swagger.tags = ['Users']
          #swagger.summary = 'Delete a user'
          #swagger.description = 'This endpoint deletes a user by their ID.'
        */
        try {
          const deletedUser = await UserController.delete(RequestHelper.getAllParams(req));
          if (deletedUser) {
            res.status(204).json();
          } else {
            res.status(404).json();
          }
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );
    app.post('/users/forgot-password', UserValidationMiddleware.forgotPassword, async (req, res) => {
      /*
          #swagger.tags = ['Users']
          #swagger.summary = 'Initiate password recovery'
          #swagger.description = 'This endpoint sends an email to the user who forgot their password containing an OTP code.'
        */
      try {
        const result = await UserController.forgotPassword(RequestHelper.getAllParams(req));
        res.status(200).json(result);
      } catch (error: any) {
        ErrorHelper.handle(error, res);
      }
    });
    app.post('/users/forgot-password/validate-otp', UserValidationMiddleware.validateOTP, async (req, res) => {
      /*
          #swagger.tags = ['Users']
          #swagger.summary = 'Validate OTP code'
          #swagger.description = 'This endpoint validates the OTP code that was sent to the user by email.'
        */
      try {
        const params = RequestHelper.getAllParams(req);
        const isValid = await UserController.validateOTP(params);
        if (isValid) {
          res.status(200).json({
            token: JWT.sign({
              email: params.email,
              operation: 'RESET_PASSWORD',
            }),
          });
        } else {
          res.status(400).send({
            message: 'INVALID_OTP_OR_EXPIRED',
          });
        }
      } catch (error: any) {
        ErrorHelper.handle(error, res);
      }
    });
    app.post('/users/reset-password', UserValidationMiddleware.resetPassword, async (req: Request, res) => {
      /*
        #swagger.tags = ['Users']
        #swagger.summary = 'Reset user password'
        #swagger.description = 'This endpoint resets the user\'s password in the database.'
      */
      try {
        const isValid = req.session && req.session.email && req.session.operation === 'RESET_PASSWORD';
        if (isValid) {
          const params = RequestHelper.getAllParams(req);
          await UserController.resetPassword(params);
          res.status(204).json();
          return;
        }
        res.status(400).json({
          message: 'Invalid token for password reset',
        });
      } catch (error: any) {
        ErrorHelper.handle(error, res);
      }
    });
  }
}
const instance = new UserRoute();
export { instance as UserRoute };
