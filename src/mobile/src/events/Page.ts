import { AllModalProps } from '@/context/Modal';
import { ApiDataType } from '@/types/Data';
import { PageMode } from '@/types/Event';
import { eventEmitter } from '@/utilities/EventEmitter';

class PageEvent {
  reload(dataType: ApiDataType, mode: PageMode | PageMode[], data: Record<string, any> = {}) {
    const pageMode = Array.isArray(mode) ? mode : [mode];
    pageMode.map((currentMode) => {
      eventEmitter.emit(`/${dataType}/${currentMode}`, { ...data, action: 'reload' });
    });
  }
  openConfirmRemove(props: Omit<AllModalProps, 'id' | 'type' | 'title' | 'text'>, description = 'registro') {
    const data: { props: AllModalProps; action: 'open' | 'close' } = {
      props: {
        id: 'CONFIRM_REMOVE',
        type: 'question',
        title: 'Confirmação de Remoção',
        text: `Confirma remoção do registro "${description || 'registro'}"?`,
        onSubmit(answer) {
          if (props.onSubmit) {
            eventEmitter.emit('MODAL_EVENT', { props: { id: 'CONFIRM_REMOVE' }, action: 'close' });
            props.onSubmit(answer);
          }
        },
      },
      action: 'open',
    };
    eventEmitter.emit('MODAL_EVENT', data);
  }
}

const instance = new PageEvent();

export { instance as PageEvent };
