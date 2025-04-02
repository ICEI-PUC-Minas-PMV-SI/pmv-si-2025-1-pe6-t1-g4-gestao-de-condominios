import { Application } from 'express';
import { PaymentValidationMiddleware } from '@validations';
import { AuthorizationMiddleware } from '@middlewares';
import { ErrorHelper, RequestHelper } from '@helpers';
import { PaymentController } from '@controllers';
class PaymentRoute {
  register(app: Application) {
    app.post(
      '/Payments',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      PaymentValidationMiddleware.create,
      async (req, res) => {
        /*
          #swagger.tags = ['Payments']
          #swagger.summary = 'Create a Payment'
          #swagger.description = 'This endpoint creates a new Payment.'
        */
        try {
          const { session, ...data } = RequestHelper.getAllParams(req);
          const Payments = await PaymentController.create(data);
          res.status(201).json({ Payments });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    app.get('/Payments', AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']), async (req, res) => {
      /*
          #swagger.tags = ['Payments']
          #swagger.summary = 'Retrieve all Payments'
          #swagger.description = 'This endpoint returns a list of all Payments.'
        */
      try {
        const Payments = await PaymentController.listAll();
        res.status(200).json({ Payments });
      } catch (error: any) {
        ErrorHelper.handle(error, res);
      }
    });

    app.get(
      '/Payments/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER', 'RESIDENT']),
      PaymentValidationMiddleware.findPaymentById,
      async (req, res) => {
        /*
          #swagger.tags = ['Payments']
          #swagger.summary = 'Retrieve a Payment by ID'
          #swagger.description = 'This endpoint returns a Payment by its ID.'
        */
        try {
          const payload = RequestHelper.getAllParams(req);
          const Payments = await PaymentController.find(payload);
          res.status(200).json({ Payments });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    app.put(
      '/Payments/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      PaymentValidationMiddleware.update,
      async (req, res) => {
        /*
          #swagger.tags = ['Payments']
          #swagger.summary = 'Update a Payment'
          #swagger.description = 'This endpoint updates an existing Payment.'
        */
        try {
          const payload = RequestHelper.getAllParams(req);
          await PaymentController.update(payload);
          res.status(200).json();
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    app.delete(
      '/Payments/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      PaymentValidationMiddleware.delete,
      async (req, res) => {
        /*
          #swagger.tags = ['Payments']
          #swagger.summary = 'Delete a Payment'
          #swagger.description = 'This endpoint deletes a Payment by their ID.'
        */
        try {
          const deletedPayment = await PaymentController.delete(RequestHelper.getAllParams(req));
          if (deletedPayment) {
            res.status(204).json();
          } else {
            res.status(404).json({ message: 'Payment not found' });
          }
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );
  }
}

const instance = new PaymentRoute();
export { instance as PaymentRoute };
