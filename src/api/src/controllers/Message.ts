import { MessageService } from '@services';
import { RequestPayload } from '@types';

class MessageController {
  async sendMessage(payload: {
    receiverId: string;
    content: string;
  }) {
    return MessageService.saveMessage(payload.receiverId, payload.content);
  }

  async sendNotification(payload: {
    receiverId: string;
    content: string;
  }) {
    return MessageService.sendNotification(payload.receiverId, payload.content);
  }

  async listAll() {
    return MessageService.listAll();
  }

  async find(payload: Partial<{ id: string }>) {
    return MessageService.find(payload);
  }

  async delete(payload: RequestPayload) {
    return MessageService.delete(payload);
  }

  async markAsRead(payload: { messageId: string }) {
    return MessageService.markAsRead(payload.messageId);
  }
}

const instance = new MessageController();
export { instance as MessageController };
