import { ApartmentController } from '@controllers';
import { ErrorHelper, RequestHelper } from '@helpers';
import { Application } from 'express';
import { ApartmentValidationMiddleware } from '@validations';
import { AuthorizationMiddleware } from '@middlewares';

class ApartmentRoute {
  register(app: Application) {
    app.post(
      '/apartments',
      AuthorizationMiddleware.scope(['ADMIN']),
      ApartmentValidationMiddleware.create,
      async (req, res) => {
        /*
          #swagger.tags = ['Apartments']
          #swagger.summary = 'Register an apartments'
          #swagger.description = 'This endpoint registers an apartment.'
        */
        try {
          const { session, ...data } = RequestHelper.getAllParams(req);
          const apartment = await ApartmentController.create(data);
          res.status(201).json(apartment);
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    app.get(
      '/apartments',
      // AuthorizationMiddleware.scope(['ADMIN', 'MANAGER', 'RESIDENT']),
      async (req, res) => {
        /*
          #swagger.tags = ['Apartments']
          #swagger.summary = 'Retrieve all apartments'
          #swagger.description = 'This endpoint returns a list of all apartments.'
        */
        try {
          const { session, ...data } = RequestHelper.getAllParams(req);
          const apartments = await ApartmentController.listAll(data);
          res.status(200).json(apartments);
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    app.get(
      '/apartments/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER', 'RESIDENT']),
      ApartmentValidationMiddleware.find,
      async (req, res) => {
        /*
          #swagger.tags = ['Apartments']
          #swagger.summary = 'Retrieve an apartment by ID'
          #swagger.description = 'This endpoint returns an apartment by ID.'
        */
        try {
          const apartment = await ApartmentController.find(RequestHelper.getAllParams(req));
          if (apartment) {
            res.status(200).json(apartment);
          } else {
            res.status(404).json();
          }
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    app.put(
      '/apartments/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      ApartmentValidationMiddleware.update,
      async (req, res) => {
        /*
          #swagger.tags = ['Apartments']
          #swagger.summary = 'Update an apartment'
          #swagger.description = 'This endpoint updates an existing apartment.'
        */
        try {
          const { session, ...data } = RequestHelper.getAllParams(req);
          const apartment = await ApartmentController.update(data);
          if (apartment) {
            res.status(200).json();
          } else {
            res.status(404).json();
          }
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    app.delete(
      '/apartments/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      ApartmentValidationMiddleware.delete,
      async (req, res) => {
        /*
          #swagger.tags = ['Apartments']
          #swagger.summary = 'Delete an apartment'
          #swagger.description = 'This endpoint deletes an apartment by ID.'
        */
        try {
          const deleted = await ApartmentController.delete(RequestHelper.getAllParams(req));
          if (deleted) {
            res.status(204).json();
          } else {
            res.status(404).json();
          }
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    app.post(
      '/apartments/:id/assign-user',
      AuthorizationMiddleware.scope(['ADMIN']),
      ApartmentValidationMiddleware.assignUser,
      async (req, res) => {
        /*
          #swagger.tags = ['Apartments']
          #swagger.summary = 'Assign an user to an apartment'
          #swagger.description = 'This endpoint assigns a user to an apartment.'
        */
        try {
          const result = await ApartmentController.assignUser(RequestHelper.getAllParams(req));
          res.status(200).json({ message: 'User assigned successfully', result });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    app.delete(
      '/apartments/:id/unassign-user/:userId',
      AuthorizationMiddleware.scope(['ADMIN']),
      ApartmentValidationMiddleware.unassignUser,
      async (req, res) => {
        /*
          #swagger.tags = ['Apartments']
          #swagger.summary = 'Unassign an user to an apartment'
          #swagger.description = 'This endpoint unassigns a user to an apartment.'
        */
        try {
          const result = await ApartmentController.unassignUser(RequestHelper.getAllParams(req));
          res.status(200).json({ message: 'User removed successfully', result });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );
  }
}

const instance = new ApartmentRoute();
export { instance as ApartmentRoute };
