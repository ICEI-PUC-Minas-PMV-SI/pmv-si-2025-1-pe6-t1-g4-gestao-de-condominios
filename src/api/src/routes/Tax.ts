import { Application } from 'express';
import { TaxValidationMiddleware } from '@validations';
import { AuthorizationMiddleware } from '@middlewares';
import { ErrorHelper, RequestHelper } from '@helpers';
import { TaxController } from '@controllers';
class TaxRoute {
  register(app: Application) {
    app.post(
      '/taxes',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      TaxValidationMiddleware.create,
      async (req, res) => {
        /*
          #swagger.tags = ['Taxes']
          #swagger.summary = 'Create a tax'
          #swagger.description = 'This endpoint creates a new tax.'
        */
        try {
          const { session, ...data } = RequestHelper.getAllParams(req);
          const taxes = await TaxController.create(data);
          res.status(201).json({ taxes });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    app.get('/taxes', AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']), async (req, res) => {
      /*
          #swagger.tags = ['Taxes']
          #swagger.summary = 'Retrieve all taxes'
          #swagger.description = 'This endpoint returns a list of all taxes.'
        */
      try {
        const taxes = await TaxController.listAll();
        res.status(200).json({ taxes });
      } catch (error: any) {
        ErrorHelper.handle(error, res);
      }
    });

    app.get(
      '/taxes/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER', 'RESIDENT']),
      TaxValidationMiddleware.findTaxById,
      async (req, res) => {
        /*
          #swagger.tags = ['Taxes']
          #swagger.summary = 'Retrieve a tax by ID'
          #swagger.description = 'This endpoint returns a tax by its ID.'
        */
        try {
          const payload = RequestHelper.getAllParams(req);
          const taxes = await TaxController.find(payload);
          res.status(200).json({ taxes });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    app.put(
      '/taxes/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      TaxValidationMiddleware.update,
      async (req, res) => {
        /*
          #swagger.tags = ['Taxes']
          #swagger.summary = 'Update a tax'
          #swagger.description = 'This endpoint updates an existing tax.'
        */
        try {
          const payload = RequestHelper.getAllParams(req);
          await TaxController.update(payload);
          res.status(200).json();
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    app.delete(
      '/taxes/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      TaxValidationMiddleware.delete,
      async (req, res) => {
        /*
          #swagger.tags = ['Taxes']
          #swagger.summary = 'Delete a tax'
          #swagger.description = 'This endpoint deletes a tax by their ID.'
        */
        try {
          const deletedTax = await TaxController.delete(RequestHelper.getAllParams(req));
          if (deletedTax) {
            res.status(204).json();
          } else {
            res.status(404).json({ message: 'Tax not found' });
          }
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );
  }
}

const instance = new TaxRoute();
export { instance as TaxRoute };
