type Listener = (data: any) => void;
type EventName = 'MODAL_EVENT' | 'LOADER_EVENT' | string;

class EventEmitter {
  private static listeners: { [key: string]: Listener[] } = {};

  on(event: EventName, listener: Listener) {
    if (!EventEmitter.listeners[event]) {
      EventEmitter.listeners[event] = [];
    }
    EventEmitter.listeners[event].push(listener);
  }

  emit(event: EventName, data: any) {
    if (EventEmitter.listeners[event]) {
      EventEmitter.listeners[event].forEach((listener) => listener(data));
    }
  }

  off(event: EventName, listener: Listener) {
    if (EventEmitter.listeners[event]) {
      EventEmitter.listeners[event] = EventEmitter.listeners[event].filter((l) => l !== listener);
    }
  }
}

export const eventEmitter = new EventEmitter();
