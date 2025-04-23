import { Application } from 'express';
import { NoticeManagementController } from '@controllers';
import { ErrorHelper, RequestHelper } from '@helpers';
import { NoticeManagementValidationMiddleware } from '@validations';
import { AuthorizationMiddleware } from '@middlewares';

class NoticeManagementRoute {
  register(app: Application) {
    /**
     * @swagger
     * tags:
     *   name: Notice Management
     *   description: Gestão de avisos e comunicados do condomínio
     */

    /**
     * @swagger
     * /notice-managements:
     *   post:
     *     tags: [Notice Management]
     *     summary: Cria um novo aviso
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/custom-schemas/NoticeManagementCreate'
     *     responses:
     *       201:
     *         description: Aviso criado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/custom-schemas/NoticeManagementResponse'
     *       400:
     *         description: Dados inválidos
     *       401:
     *         description: Não autorizado
     *       403:
     *         description: Acesso negado
     */
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

    /**
     * @swagger
     * /notice-managements:
     *   get:
     *     tags: [Notice Management]
     *     summary: Lista todos os avisos
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de avisos
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/custom-schemas/NoticeManagementResponse'
     *       401:
     *         description: Não autorizado
     *       403:
     *         description: Acesso negado
     */
    app.get(
      '/notice-managements',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER', 'RESIDENT']),
      async (req, res) => {
        try {
          const result = await NoticeManagementController.listAll();
          res.status(200).json(result);
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    /**
     * @swagger
     * /notice-managements/{id}:
     *   get:
     *     tags: [Notice Management]
     *     summary: Obtém um aviso específico
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do aviso
     *     responses:
     *       200:
     *         description: Detalhes do aviso
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/custom-schemas/NoticeManagementResponse'
     *       400:
     *         description: ID inválido
     *       401:
     *         description: Não autorizado
     *       404:
     *         description: Aviso não encontrado
     */
    app.get(
      '/notice-managements/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER', 'RESIDENT']),
      NoticeManagementValidationMiddleware.find,
      async (req, res) => {
        try {
          const data = RequestHelper.getAllParams(req);
          const result = await NoticeManagementController.find(data);
          res.status(200).json(result);
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    /**
     * @swagger
     * /notice-managements/{id}:
     *   put:
     *     tags: [Notice Management]
     *     summary: Atualiza um aviso existente
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do aviso
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/custom-schemas/NoticeManagementCreate'
     *     responses:
     *       200:
     *         description: Aviso atualizado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/custom-schemas/NoticeManagementResponse'
     *       400:
     *         description: Dados inválidos
     *       401:
     *         description: Não autorizado
     *       404:
     *         description: Aviso não encontrado
     */
    app.put(
      '/notice-managements/:id',
      AuthorizationMiddleware.scope(['ADMIN', 'MANAGER']),
      NoticeManagementValidationMiddleware.update,
      async (req, res) => {
        try {
          const { session, ...data } = RequestHelper.getAllParams(req);
          const result = await NoticeManagementController.update({ ...data, updatedBy: session.id });
          res.status(200).json(result);
        } catch (error: any) {
          ErrorHelper.handle(error, res);
        }
      },
    );

    /**
     * @swagger
     * /notice-managements/{id}:
     *   delete:
     *     tags: [Notice Management]
     *     summary: Exclui um aviso
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do aviso
     *     responses:
     *       204:
     *         description: Aviso excluído com sucesso
     *       400:
     *         description: ID inválido
     *       401:
     *         description: Não autorizado
     *       404:
     *         description: Aviso não encontrado
     */
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
