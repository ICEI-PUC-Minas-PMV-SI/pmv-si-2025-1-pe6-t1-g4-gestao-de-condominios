import { Application } from 'express';
import { CommonAreaController } from '@controllers';
import { ErrorHelper, RequestHelper } from '@helpers';
import { CommonAreaValidationMiddleware } from '@validations';
import { AuthorizationMiddleware } from '@middlewares';

class CommonAreaRoute {
  register(app: Application) {
    app.post(
      '/common-areas',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      CommonAreaValidationMiddleware.create,
      async (req, res) => {
        try {
          const { session, ...data } = RequestHelper.getAllParams(req);
          const result = await CommonAreaController.create(data);
          res.status(201).json({ commonArea: result });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      }
    );

    app.get(
      '/common-areas',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER', 'RESIDENT']),
      async (req, res) => {
        try {
          const result = await CommonAreaController.listAll();
          res.status(200).json({ commonAreas: result });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      }
    );

    app.get(
      '/common-areas/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER', 'RESIDENT']),
      CommonAreaValidationMiddleware.find,
      async (req, res) => {
        try {
          const data = RequestHelper.getAllParams(req);
          const result = await CommonAreaController.find(data);
          res.status(200).json({ commonArea: result });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      }
    );

    app.put(
      '/common-areas/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER', 'RESIDENT']),
      CommonAreaValidationMiddleware.update,
      async (req, res) => {
        try {
          const data = RequestHelper.getAllParams(req);
          const result = await CommonAreaController.update(data);
          res.status(200).json({ commonArea: result });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      }
    );

    app.delete(
      '/common-areas/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      CommonAreaValidationMiddleware.delete,
      async (req, res) => {
        try {
          const data = RequestHelper.getAllParams(req);
          await CommonAreaController.delete(data);
          res.status(204).send();
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      }
    );
  }
}

const instance = new CommonAreaRoute();
export { instance as CommonAreaRoute };
