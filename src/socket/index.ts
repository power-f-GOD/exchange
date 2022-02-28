import { writable, type Writable } from 'svelte/store';
import { BINANCE_STREAMS_WS_BASE_URL } from './constants';
import { ADARouter } from './ada.router';
import { BTCRouter } from './btc.router';
import { ETHRouter } from './eth.router';
import { type StreamMiniResponse, ExchangeSymbolsEnum, type Socket } from '../types';

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
      const { data }: StreamMiniResponse = JSON.parse(event.data);

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
  closeSocket();

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
      console.log('Sockets shook hands and became friends!');
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
    }

    globalSocketWritable.set(null);
  });
};

let socketSendTimeout: any;

export const socketSend = <DataType = any>(data: Partial<DataType>, subscribeOnce?: boolean) => {
  if (!globalSocket && globalSocketWritable) {
    globalSocketWritable.subscribe((instance) => {
      globalSocket = instance;
    });
  }

  if (globalSocket?.readyState !== globalSocket?.OPEN) {
    clearTimeout(socketSendTimeout);
    socketSendTimeout = setTimeout(() => {
      socketSend(data, subscribeOnce);
    }, 2000);
    return;
  }

  if (globalSocket?.OPEN) {
    globalSocket.send(JSON.stringify(data));

    if (subscribeOnce) {
      clearTimeout(socketSendTimeout);
      socketSendTimeout = setTimeout(() => {
        globalSocket?.close();
        globalSocketWritable.set(null);
      }, 2000);
    }
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Error: Could not send data: '${JSON.stringify(data)}': Sockets aren't friends.`);
    }

    if (!subscribeOnce) initSocket();
  }
};
