import { Application } from 'express';
import { CondominiumValidationMiddleware } from '@validations';
import { AuthorizationMiddleware } from '@middlewares';
import { ErrorHelper, RequestHelper } from '@helpers';
import { CondominiumController } from '@controllers';

class CondominiumRoute {
  register(app: Application) {
    app.post(
      '/condominiums',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      CondominiumValidationMiddleware.create,
      async (req, res) => {
        /*
          #swagger.tags = ['Condominiums']
          #swagger.summary = 'Register a condominium'
          #swagger.description = 'This endpoint registers a condominium.'
        */
        try {
          const { session, ...data } = RequestHelper.getAllParams(req);
          const condominium = await CondominiumController.create(data);
          res.status(201).json({ condominium });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      }
    );

    app.get(
      '/condominiums',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER', 'RESIDENT']),
      async (req, res) => {
        /*
          #swagger.tags = ['Condominiums']
          #swagger.summary = 'Retrieve all condominiums'
          #swagger.description = 'This endpoint returns a list of all condominiums.'
        */
        try {
          const condominiums = await CondominiumController.listAll();
          res.status(200).json(condominiums);
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      }
    );

    app.get(
      '/condominiums/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER', 'RESIDENT']),
      CondominiumValidationMiddleware.find,
      async (req, res) => {
        /*
          #swagger.tags = ['Condominiums']
          #swagger.summary = 'Retrieve a condominium'
          #swagger.description = 'This endpoint returns a condominium.'
        */
        try {
          const payload = RequestHelper.getAllParams(req);
          const condominium = await CondominiumController.find(payload);
          res.status(200).json(condominium);
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      }
    );

    app.put(
      '/condominiums/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      CondominiumValidationMiddleware.update,
      async (req, res) => {
        /*
          #swagger.tags = ['Condominiums']
          #swagger.summary = 'Update a condominium'
          #swagger.description = 'This endpoint updates a condominium.'
        */
        try {
          const payload = RequestHelper.getAllParams(req);
          await CondominiumController.update(payload);
          res.status(200).json();
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      }
    );

    app.delete(
      '/condominiums/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      CondominiumValidationMiddleware.delete,
      async (req, res) => {
        /*
          #swagger.tags = ['Condominiums']
          #swagger.summary = 'Delete a condominium'
          #swagger.description = 'This endpoint deletes a condominium.'
        */
        try {
          const payload = RequestHelper.getAllParams(req);
          await CondominiumController.delete(payload);
          res.status(204).json();
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      }
    );
  }
}

const instance = new CondominiumRoute();
export { instance as CondominiumRoute };
