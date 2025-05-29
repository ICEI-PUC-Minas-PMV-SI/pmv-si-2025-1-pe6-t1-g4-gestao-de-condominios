import Toast, { ToastShowParams } from 'react-native-toast-message';
import Messages from './Messages';
import TypeCheck from './TypeCheck';
import { eventEmitter } from './EventEmitter';

type NotificationParams = {
  title?: string;
  message: string;
  altMessage?: string;
  toast?: boolean;
};

type NotificationInfo = {
  type: 'error' | 'success' | 'warning' | 'info';
};

class Alert {
  showNotification(params: NotificationParams & NotificationInfo) {
    let { message, title = '', type, toast = true } = params;
    if (TypeCheck.isMessageKey(message)) {
      message = Messages[message];
    }
    if (type === 'error') {
      console.error(title, message);
    }
    if (toast) {
      const toastParams: ToastShowParams = {
        type: type === 'warning' ? 'error' : type,
        text1Style: { fontSize: 18 },
        text2Style: { fontSize: 14 },
      };
      if (title) {
        toastParams.text1 = title;
      }
      if (message) {
        toastParams.text2 = message;
      }
      Toast.show(toastParams);
    } else {
      eventEmitter.emit('MODAL_EVENT', {
        opened: true,
        data: {
          type: 'message',
          messageType: type,
          title,
          text: message,
        },
      });
    }
  }
  showSuccess(params: NotificationParams) {
    this.showNotification({ title: 'Sucesso', ...params, type: 'success' });
  }
  showInfo(params: NotificationParams) {
    this.showNotification({ title: 'Informação', ...params, type: 'info' });
  }
  showError(params: NotificationParams) {
    this.showNotification({
      title: 'Atenção',
      ...params,
      type: 'error',
    });
  }
  showWarning(params: NotificationParams) {
    this.showNotification({ title: 'Aviso', ...params, type: 'warning' });
  }
}

const instance = new Alert();
export { instance as Alert };
