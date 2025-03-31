import { Application } from 'express';
import { NoticemanagementController } from '@controllers';
import { ErrorHelper, RequestHelper } from '@helpers';
import { NoticemanagementValidationMiddleware } from '@validations';
import { AuthorizationMiddleware } from '@middlewares';

class NoticemanagementRoute {
  register(app: Application) {
    // Rota para criar um novo aviso
    app.post(
      '/noticemanagements',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      NoticemanagementValidationMiddleware.create,
      async (req, res) => {
        try {
          const { session, ...data } = RequestHelper.getAllParams(req);
          const result = await NoticemanagementController.create(data);
          res.status(201).json({ noticemanagement: result });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      }
    );

    // Rota para listar todos os avisos
    app.get(
      '/noticemanagements',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER', 'RESIDENT']),
      async (req, res) => {
        try {
          const result = await NoticemanagementController.listAll();
          res.status(200).json({ noticemanagements: result });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      }
    );

    // Rota para buscar um aviso específico
    app.get(
      '/noticemanagements/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER', 'RESIDENT']),
      NoticemanagementValidationMiddleware.find,
      async (req, res) => {
        try {
          const data = RequestHelper.getAllParams(req);
          const result = await NoticemanagementController.find(data);
          res.status(200).json({ noticemanagement: result });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      }
    );

    // Rota para atualizar um aviso
    app.put(
      '/noticemanagements/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      NoticemanagementValidationMiddleware.update,
      async (req, res) => {
        try {
          const data = RequestHelper.getAllParams(req);
          const result = await NoticemanagementController.update(data);
          res.status(200).json({ noticemanagement: result });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      }
    );

    // Rota para deletar um aviso
    app.delete(
      '/noticemanagements/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      NoticemanagementValidationMiddleware.delete,
      async (req, res) => {
        try {
          const data = RequestHelper.getAllParams(req);
          await NoticemanagementController.delete(data);
          res.status(204).send();
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      }
    );
  }
}

const instance = new NoticemanagementRoute();
export { instance as NoticemanagementRoute };
