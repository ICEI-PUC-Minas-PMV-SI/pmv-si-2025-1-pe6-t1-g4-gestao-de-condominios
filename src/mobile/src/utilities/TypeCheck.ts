import { AllModalProps, QuestionModalProps, DefaultModalProps, MessageModalProps, ModalProps } from '../context/Modal';
import Messages, { MessageKey } from './Messages';

class TypeCheck {
  isMessageKey(message: string): message is MessageKey {
    return message in Messages;
  }
  isMessageModalProps(props: AllModalProps): props is ModalProps<MessageModalProps> {
    return props.type === 'message';
  }
  isQuestionModalProps(props: AllModalProps): props is ModalProps<QuestionModalProps> {
    return props.type === 'question';
  }
  isDefaultModalProps(props: AllModalProps): props is ModalProps<DefaultModalProps> {
    return props.type === 'default';
  }
}

export default new TypeCheck();
