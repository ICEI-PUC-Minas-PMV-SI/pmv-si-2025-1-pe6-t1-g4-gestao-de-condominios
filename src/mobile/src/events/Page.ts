import { PageMode } from '@/types/Event';
import { eventEmitter } from '@/utilities/EventEmitter';

type DataType = 'users' | 'apartments' | 'payments' | 'fees';

class PageEvent {
  reload(dataType: DataType, mode: PageMode | PageMode[], data: Record<string, any> = {}) {
    const pageMode = Array.isArray(mode) ? mode : [mode];
    pageMode.map((currentMode) => {
      eventEmitter.emit(`/${dataType}/${currentMode}`, { ...data, action: 'reload' });
    });
  }
}

const instance = new PageEvent();

export { instance as PageEvent };
