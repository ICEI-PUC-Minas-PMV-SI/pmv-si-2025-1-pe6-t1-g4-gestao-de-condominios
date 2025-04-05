import { MessageController } from '@controllers';
import { ErrorHelper, RequestHelper } from '@helpers';
import { Application } from 'express';
import { MessageValidationMiddleware } from '@validations';
import { AuthorizationMiddleware } from '@middlewares';

class MessageRoute {
  register(app: Application) {
    app.post(
      '/messages',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER', 'RESIDENT']),
      MessageValidationMiddleware.create,
      async (req, res) => {
        try {
          const userId = (req as unknown as Request & { user: { id: string } }).user.id;
    
          const message = await MessageController.sendMessage({
            ...RequestHelper.getAllParams(req),
            userId,
          });
          res.status(201).json({ message });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    app.get(
      '/messages',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER', 'RESIDENT']),
      async (req, res) => {
        try {
          const messages = await MessageController.listAll();
          res.status(200).json({ messages });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    app.get(
      '/messages/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER', 'RESIDENT']),
      MessageValidationMiddleware.find,
      async (req, res) => {
        try {
          const message = await MessageController.find(RequestHelper.getAllParams(req));
          if (message) {
            res.status(200).json({ message });
          } else {
            res.status(404).json();
          }
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    app.delete(
      '/messages/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      MessageValidationMiddleware.delete,
      async (req, res) => {
        try {
          const deleted = await MessageController.delete(RequestHelper.getAllParams(req));
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
      "/messages/send",
      //AuthorizationMiddleware.scope(["ADMIN", "MANAGER"]),
      MessageValidationMiddleware.send,
      async (req, res) => {
        try {
          console.log('Realizando Route')
          const notification = await MessageController.sendNotification(RequestHelper.getAllParams(req));
          res.status(201).json({ notification });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      }
    );
  }
}

const instance = new MessageRoute();
export { instance as MessageRoute };
