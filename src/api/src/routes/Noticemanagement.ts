import { Application } from 'express';
import { NoticeManagementController } from '@controllers';
import { ErrorHelper, RequestHelper } from '@helpers';
import { NoticeManagementValidationMiddleware } from '@validations';
import { AuthorizationMiddleware } from '@middlewares';

class NoticeManagementRoute {
  register(app: Application) {
    // Rota para criar um novo aviso
    app.post(
      '/notice-managements',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      NoticeManagementValidationMiddleware.create,
      async (req, res) => {
        try {
          const { session, ...data } = RequestHelper.getAllParams(req);
          const result = await NoticeManagementController.create({ ...data, createdBy: session.id });
          res.status(201).json({ noticeManagement: result });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    // Rota para listar todos os avisos
    app.get(
      '/notice-managements',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER', 'RESIDENT']),
      async (req, res) => {
        try {
          const result = await NoticeManagementController.listAll();
          res.status(200).json({ noticeManagement: result });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    // Rota para buscar um aviso específico
    app.get(
      '/notice-managements/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER', 'RESIDENT']),
      NoticeManagementValidationMiddleware.find,
      async (req, res) => {
        try {
          const data = RequestHelper.getAllParams(req);
          const result = await NoticeManagementController.find(data);
          res.status(200).json({ noticeManagement: result });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    // Rota para atualizar um aviso
    app.put(
      '/notice-managements/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      NoticeManagementValidationMiddleware.update,
      async (req, res) => {
        try {
          const { session, ...data } = RequestHelper.getAllParams(req);
          const result = await NoticeManagementController.update({ ...data, updatedBy: session.id });
          res.status(200).json({ noticeManagement: result });
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    // Rota para deletar um aviso
    app.delete(
      '/notice-managements/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      NoticeManagementValidationMiddleware.delete,
      async (req, res) => {
        try {
          const data = RequestHelper.getAllParams(req);
          await NoticeManagementController.delete(data);
          res.status(204).send();
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );
  }
}

const instance = new NoticeManagementRoute();
export { instance as NoticeManagementRoute };
