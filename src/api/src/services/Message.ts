import { PrismaDB } from '@db';
import { message, Prisma } from '@prisma/client';
import { RequestPayload } from '@types';
import { FirebaseMessaging } from '@providers';
import crypto from 'crypto';

class MessageService {
  async create(data: Prisma.messageCreateInput) {
    return PrismaDB.message.create({
      data,
      select: { id: true },
    });
  }

  async find(message: Partial<message>) {
    const where: Prisma.messageWhereInput = {};

    if (message.id) where.id = message.id;
    if (message.senderId) where.senderId = message.senderId;
    if (message.receiverId) where.receiverId = message.receiverId;
    if (message.status) where.status = message.status;

    if (Object.keys(where).length === 0) {
      throw new Error('INVALID_MESSAGE_IDENTIFICATION');
    }

    return PrismaDB.message.findFirstOrThrow({ where });
  }

  async saveMessage(senderId: string, receiverId: string, content: string) {
    const receiver = await PrismaDB.user.findUnique({
      where: { id: receiverId },
      select: { id: true, fcmToken: true },
    });

    if (!receiver) {
      throw new Error('RECEIVER_NOT_FOUND');
    }

    const message = await PrismaDB.message.create({
      data: {
        id: crypto.randomUUID(),
        senderId,
        receiverId,
        content,
        status: 'SENT',
        updatedAt: new Date(),
      },
    });

    if (receiver.fcmToken) {
      try {
        await FirebaseMessaging.send({
          token: receiver.fcmToken,
          notification: {
            title: 'Nova Mensagem',
            body: content,
          },
        });

        console.log(`✅ Notificação enviada para ${receiverId}`);
      } catch (error) {
        console.error('❌ Erro ao enviar notificação:', error);
      }
    } else {
      console.warn(`⚠️ Usuário ${receiverId} não possui token FCM.`);
    }

    return message;
  }

  async sendNotification(receiverId: string, content: string) {
    
    /*const user = await PrismaDB.user.findUnique({
      where: { id: receiverId },
      select: { fcmToken: true },
    });*/

    /*if (!user?.fcmToken) {
      console.warn(`Usuário ${receiverId} não possui token FCM registrado.`);
      return {
        status: 404,
        error: 'FCM_TOKEN_NOT_FOUND',
      };
    }*/

    const messageRecord = await PrismaDB.message.create({
      data: {
        id: crypto.randomUUID(),
        senderId: 'system',
        receiverId,
        content,
        status: 'SENT',
        updatedAt: new Date(),
      },
    });

    try {
      const response = await FirebaseMessaging.send({
        token: receiverId,
        notification: {
          title: 'Nova Mensagem',
          body: content,
        },
      });

      console.log(`✅ Notificação enviada para ${receiverId}`);
      return {
        status: 200,
        message: 'Notificação enviada e mensagem salva com sucesso',
        response,
        savedMessage: messageRecord,
      };
    } catch (error: any) {
      console.error('❌ Erro ao enviar notificação:', error);
      return {
        status: 500,
        error: 'FAILED_TO_SEND_NOTIFICATION',
        details: error.message,
      };
    }
  }

  async markAsRead(messageId: string) {
    return PrismaDB.message.update({
      where: { id: messageId },
      data: { status: 'READ' },
    });
  }

  async delete(payload: RequestPayload) {
    return PrismaDB.message.delete({
      where: { id: payload.id },
    });
  }

  async listAll() {
    return PrismaDB.message.findMany();
  }
}

const instance = new MessageService();
export { instance as MessageService };
