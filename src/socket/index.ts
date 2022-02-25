import { io } from 'socket.io-client';
import { writable, type Writable } from 'svelte/store';
import {
  SocketEventsEnum,
  WS_BASE_URL,
  type SocketResponsePayload,
  type SocketResponsePayloadBase
} from './constants';
import exchangeRouter from './exchange.router';

export * from './constants';

export let globalSocket: Writable<ReturnType<typeof io>>;

export const activateSocketRouters = () => {
  let socket: ReturnType<typeof io>;

  if (!globalSocket) return;

  globalSocket.subscribe((instance) => {
    socket = instance;

    if (!socket?.connected) {
      return;
    }

    socket.onAny((eventName: SocketEventsEnum, payload: SocketResponsePayload) => {
      switch (eventName) {
        case SocketEventsEnum.EXCHANGE:
          exchangeRouter(eventName, payload);
          break;
      }
    });
  });
};

export const initSocket = () => {
  //close webSocket if initially open to avoid bugs of double responses
  closeSocket();

  let socket: ReturnType<typeof io>;

  globalSocket = writable(
    io(`${WS_BASE_URL}/?token=${'token'}`, {
      transports: ['websocket', 'polling'] // use WebSocket first, if available
    })
  );

  globalSocket.subscribe((instance) => {
    socket = instance;

    if (!socket) return;

    socket.connect();
    socket.on('connect', () => {
      console.trace('Sockets shook hands!');
      activateSocketRouters();
    });
    socket.on('exception', (...args) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('EXCEPTION:', args);
      }
    });
    socket.on('disconnect', () => {
      console.trace('Sockets called it a day!');
      closeSocket();
    });
  });

  return globalSocket;
};

export const closeSocket = () => {
  let socket: ReturnType<typeof io>;

  if (!globalSocket) return;

  globalSocket.subscribe((instance) => {
    socket = instance;

    if (socket) {
      socket.offAny();

      if (socket.connected) {
        socket.close();
      }
    }

    globalSocket.set(null);
  });
};

export const socketEmit = <DataType = any>(
  eventName: SocketEventsEnum,
  data: Partial<DataType>,
  payloadBase?: SocketResponsePayloadBase
) => {
  let socket: ReturnType<typeof io>;

  if (!globalSocket) return;

  globalSocket.subscribe((instance) => {
    socket = instance;

    if (socket?.connected) {
      socket.emit(eventName, normalizeSocketPayload(data, payloadBase));
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Error: Could not emit event: '${eventName}': Sockets not connected.`);
      }

      initSocket();
    }
  });
};

export const normalizeSocketPayload = <DataType = any>(
  data: DataType,
  payloadBase?: SocketResponsePayloadBase
) => {
  return {
    data,
    ...(payloadBase || {})
  };
};
