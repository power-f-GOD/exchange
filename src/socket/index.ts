import { writable, type Writable } from 'svelte/store';

import { BINANCE_STREAMS_WS_BASE_URL } from './constants';
import { ADARouter } from './ADA.router';
import { BTCRouter } from './BTC.router';
import { ETHRouter } from './ETH.router';
import { ExchangeSymbolsEnum, type Socket, type StreamResponse } from '../types';

export * from './ADA.router';
export * from './BTC.router';
export * from './ETH.router';
export * from './constants';

export let globalSocket: Socket;
export let globalSocketWritable: Writable<Socket>;

export const activateSocketRouters = () => {
  if (!globalSocketWritable) return;

  globalSocketWritable.subscribe((instance) => {
    globalSocket = instance;

    if (!globalSocket?.OPEN) {
      return;
    }

    globalSocket.addEventListener('message', (event) => {
      const { data }: StreamResponse = JSON.parse(event.data);

      switch (data?.s) {
        case ExchangeSymbolsEnum.ADAUSDT:
          ADARouter(data);
          break;
        case ExchangeSymbolsEnum.BTCUSDT:
          BTCRouter(data);
          break;
        case ExchangeSymbolsEnum.ETHUSDT:
          ETHRouter(data);
          break;
      }
    });
  });
};

export const initSocket = () => {
  //close webSocket if initially open to avoid bugs of double responses
  if (globalSocket?.readyState === globalSocket?.OPEN) {
    closeSocket();
  }

  if (!globalThis.WebSocket) return writable(null);

  globalSocketWritable = writable(
    new globalThis.WebSocket(
      `${BINANCE_STREAMS_WS_BASE_URL}/stream?streams=btcusdt/ethusdt/adausdt`
    )
  );

  globalSocketWritable.subscribe((instance) => {
    globalSocket = instance;

    if (!globalSocket) return;

    globalSocket.addEventListener('open', () => {
      console.log('Sockets shook hands!');
      activateSocketRouters();
    });
    globalSocket.addEventListener('close', () => {
      console.log('Sockets called it a day!');
    });
    globalSocket.addEventListener('error', (e) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('EXCEPTION:', e);
      }
    });
  });

  return globalSocketWritable;
};

export const closeSocket = () => {
  if (!globalSocketWritable) return;

  globalSocketWritable.subscribe((instance) => {
    globalSocket = instance;

    if (globalSocket?.OPEN) {
      globalSocket.close();
      globalSocketWritable.set(null);
    }
  });
};

let socketSendTimeout: any;

export const socketSend = <DataType = any>(
  data: Partial<DataType>,
  subscribeOnce?: boolean,
  interval?: number
) => {
  if (!globalSocket && globalSocketWritable) {
    globalSocketWritable.subscribe((instance) => {
      globalSocket = instance;
    });
  }

  // retry send message (every 2s) if socket is not ready yet
  if (globalSocket?.readyState !== globalSocket?.OPEN) {
    clearTimeout(socketSendTimeout);
    socketSendTimeout = setTimeout(() => {
      socketSend(data, subscribeOnce, interval);
    }, 2000);
    return;
  }

  if (globalSocket?.OPEN) {
    globalSocket.send(JSON.stringify(data));

    if (subscribeOnce) {
      clearTimeout(socketSendTimeout);
      socketSendTimeout = setTimeout(() => {
        globalSocket?.send(JSON.stringify({ ...data, method: 'UNSUBSCRIBE' }));

        if (interval) {
          socketSendTimeout = setTimeout(() => {
            socketSend(data, subscribeOnce, interval);
          }, interval);
        }
      }, 1000);
    }
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `Error: Could not send data: '${JSON.stringify(data)}': Sockets didn't shake hands.`
      );
    }

    if (!subscribeOnce) initSocket();
  }
};
