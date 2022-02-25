export const WS_BASE_URL = '';

export enum SocketEventsEnum {
  EXCHANGE = 'Exchange'
}

export enum SocketPipesEnum {
  EXCHANGE = 'EXCHANGE'
}

export interface SocketResponsePayloadBase {
  pipe?: SocketPipesEnum;
  message?: string;
  error?: boolean;
}

export interface SocketResponsePayload<DataType = string | number | Record<string, any> | Date>
  extends SocketResponsePayloadBase {
  data: DataType;
}
