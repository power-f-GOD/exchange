import { SocketEventsEnum } from '.';
import type { SocketResponsePayload } from './constants';

const exchangeRouter = (eventName: SocketEventsEnum, payload: SocketResponsePayload) => {
  const { data, pipe, message } = payload;

  switch (eventName) {
    case SocketEventsEnum.EXCHANGE:
      console.log('SOCKET', data, pipe, message);
      break;
  }
};

export default exchangeRouter;
