import { Application } from 'express';
import { FeeValidationMiddleware } from '@validations';
import { AuthorizationMiddleware } from '@middlewares';
import { ErrorHelper, RequestHelper } from '@helpers';
import { FeeController } from '@controllers';
class FeeRoute {
  register(app: Application) {
    app.post(
      '/fees',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      FeeValidationMiddleware.create,
      async (req, res) => {
        /*
          #swagger.tags = ['Fees']
          #swagger.summary = 'Create a fee'
          #swagger.description = 'This endpoint creates a new fee.'
        */
        try {
          const { session, ...data } = RequestHelper.getAllParams(req);
          const fees = await FeeController.create(data);
          res.status(201).json({ fees });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    app.get('/fees', AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']), async (req, res) => {
      /*
          #swagger.tags = ['Fees']
          #swagger.summary = 'Retrieve all fees'
          #swagger.description = 'This endpoint returns a list of all fees.'
        */
      try {
        const fees = await FeeController.listAll();
        res.status(200).json({ fees });
      } catch (error: any) {
        ErrorHelper.handle(error, res);
      }
    });

    app.get(
      '/fees/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER', 'RESIDENT']),
      FeeValidationMiddleware.findFeeById,
      async (req, res) => {
        /*
          #swagger.tags = ['Fees']
          #swagger.summary = 'Retrieve a fee by ID'
          #swagger.description = 'This endpoint returns a fee by its ID.'
        */
        try {
          const payload = RequestHelper.getAllParams(req);
          const fees = await FeeController.find(payload);
          res.status(200).json({ fees });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    app.put(
      '/fees/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      FeeValidationMiddleware.update,
      async (req, res) => {
        /*
          #swagger.tags = ['Fees']
          #swagger.summary = 'Update a fee'
          #swagger.description = 'This endpoint updates an existing fee.'
        */
        try {
          const payload = RequestHelper.getAllParams(req);
          await FeeController.update(payload);
          res.status(200).json();
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    app.delete(
      '/fees/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      FeeValidationMiddleware.delete,
      async (req, res) => {
        /*
          #swagger.tags = ['Fees']
          #swagger.summary = 'Delete a fee'
          #swagger.description = 'This endpoint deletes a fee by their ID.'
        */
        try {
          const deletedFee = await FeeController.delete(RequestHelper.getAllParams(req));
          if (deletedFee) {
            res.status(204).json();
          } else {
            res.status(404).json({ message: 'Fee not found' });
          }
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );
  }
}

const instance = new FeeRoute();
export { instance as FeeRoute };
