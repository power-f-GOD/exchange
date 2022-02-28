export enum ExchangeSymbolsEnum {
  BTCUSDT = 'BTCUSDT',
  ETHUSDT = 'ETHUSDT',
  ADAUSDT = 'ADAUSDT'
}

export interface StreamMiniResponse {
  stream: string;
  data: {
    e: '24hrMiniTicker'; // Event type
    E: number; // Event time
    s: ExchangeSymbolsEnum; // Symbol
    c: string; // Close price
    o: string; // Open price
    h: string; // High price
    l: string; // Low price
    v: string; // Total traded base asset volume
    q: string; // Total traded quote asset volume
  };
}

export interface StreamResponse {
  stream: string;
  data: {
    e: '24hrMiniTicker'; // Event type
    E: number; // Event time
    s: ExchangeSymbolsEnum; // Symbol
    c: string; // Close price
    o: string; // Open price
    h: string; // High price
    l: string; // Low price
    v: string; // Total traded base asset volume
    q: string; // Total traded quote asset volume
    p: string; // Price change
    P: string; // Price change percent
    w: string; // Weighted average price
    x: string; // First trade(F)-1 price (first trade before the 24hr rolling window)
    Q: string; // Last quantity
    b: string; // Best bid price
    B: string; // Best bid quantity
    a: string; // Best ask price
    A: string; // Best ask quantity
    O: 0; // Statistics open time
    C: 86400000; // Statistics close time
    F: 0; // First trade ID
    L: 18150; // Last trade Id
    n: 18151; // Total number of trades
  };
}

export type Socket = globalThis.WebSocket | null;
