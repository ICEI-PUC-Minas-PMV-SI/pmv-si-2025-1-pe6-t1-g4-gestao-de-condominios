import { Application } from 'express';
import { PaymentValidationMiddleware } from '@validations';
import { AuthorizationMiddleware } from '@middlewares';
import { ErrorHelper, RequestHelper } from '@helpers';
import { PaymentController } from '@controllers';
class PaymentRoute {
  register(app: Application) {
    app.post(
      '/payments',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      PaymentValidationMiddleware.create,
      async (req, res) => {
        /*
          #swagger.tags = ['Payments']
          #swagger.summary = 'Create a Payment'
          #swagger.description = 'This endpoint creates a new Payment.'
          #swagger.requestBody = {
            $ref: '#/components/custom-schemas/PaymentCreate'
          }
        */
        try {
          const { session, ...data } = RequestHelper.getAllParams(req);
          if (!data.apartmentId && session.apartmentId && !data.condominiumId && session.condominiumId) {
            data.apartmentId = session.apartmentId;
            data.condominiumId = session.condominiumId;
          }
          const payments = await PaymentController.create(data);
          res.status(201).json({ payments });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    app.get('/payments', AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']), async (req, res) => {
      /*
          #swagger.tags = ['Payments']
          #swagger.summary = 'Retrieve all Payments'
          #swagger.description = 'This endpoint returns a list of all Payments.'
        */
      try {
        const payments = await PaymentController.listAll();
        res.status(200).json(payments);
      } catch (error: any) {
        ErrorHelper.handle(error, res);
      }
    });

    app.get(
      '/payments/:id',
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
          const payments = await PaymentController.find(payload);
          res.status(200).json(payments);
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    app.put(
      '/payments/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      PaymentValidationMiddleware.update,
      async (req, res) => {
        /*
          #swagger.tags = ['Payments']
          #swagger.summary = 'Update a Payment'
          #swagger.description = 'This endpoint updates an existing Payment.'
          #swagger.requestBody = {
            $ref: '#/components/custom-schemas/PaymentUpdate'
          }
        */
        try {
          const {feeId, session, userId, ...payload} = RequestHelper.getAllParams(req);
          const {
            condominiumId = session.condominiumId,
            apartmentId = session.apartmentId
          } = payload;
          if (feeId) {
            payload.fee = {connect: {id: feeId}};
          }
          if (condominiumId) {
            payload.condominium = {connect: {id: condominiumId}};
          }
          if (apartmentId) {
            payload.apartment = {connect: {id: apartmentId}};
          }
          if (apartmentId) {
            payload.apartment = {connect: {id: apartmentId}};
          }
          if (userId) {
            payload.user = {connect: {id: userId}};
          }
          delete payload.condominiumId;
          delete payload.apartmentId;
          await PaymentController.update(payload);
          res.status(200).json();
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    app.delete(
      '/payments/:id',
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
