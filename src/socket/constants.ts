import { AN_HOUR_IN_MS } from '../constants';
import type { StreamResponseData } from '../types';

export const BINANCE_STREAMS_WS_BASE_URL = 'wss://stream.binance.com:9443';

export const samplePoints: Partial<StreamResponseData>[] = [
  { h: '0.6', l: '0.4', a: '0.59', o: '0.43', O: 0, C: 86400000, E: 86400000 },
  { h: '0.6', l: '0.4', a: '0.57', o: '0.43', O: 0, C: 86400000, E: 86400000 + AN_HOUR_IN_MS * 2 },
  { h: '0.6', l: '0.4', a: '0.56', o: '0.43', O: 0, C: 86400000, E: 86400000 + AN_HOUR_IN_MS * 4 },
  { h: '0.6', l: '0.4', a: '0.54', o: '0.43', O: 0, C: 86400000, E: 86400000 + AN_HOUR_IN_MS * 6 },
  { h: '0.6', l: '0.4', a: '0.55', o: '0.43', O: 0, C: 86400000, E: 86400000 + AN_HOUR_IN_MS * 8 },
  {
    h: '0.6',
    l: '0.4',
    a: '0.58',
    o: '0.43',
    O: 0,
    C: 86400000,
    E: 86400000 + AN_HOUR_IN_MS * 10
  },
  {
    h: '0.6',
    l: '0.4',
    a: '0.52',
    o: '0.43',
    O: 0,
    C: 86400000,
    E: 86400000 + AN_HOUR_IN_MS * 12
  },
  {
    h: '0.6',
    l: '0.4',
    a: '0.55',
    o: '0.43',
    O: 0,
    C: 86400000,
    E: 86400000 + AN_HOUR_IN_MS * 14
  },
  {
    h: '0.6',
    l: '0.4',
    a: '0.53',
    o: '0.43',
    O: 0,
    C: 86400000,
    E: 86400000 + AN_HOUR_IN_MS * 16
  },
  {
    h: '0.6',
    l: '0.4',
    a: '0.54',
    o: '0.43',
    O: 0,
    C: 86400000,
    E: 86400000 + AN_HOUR_IN_MS * 18
  },
  {
    h: '0.6',
    l: '0.4',
    a: '0.57',
    o: '0.43',
    O: 0,
    C: 86400000,
    E: 86400000 + AN_HOUR_IN_MS * 20
  },
  {
    h: '0.6',
    l: '10',
    a: '0.52',
    o: '0.43',
    O: 0,
    C: 86400000,
    E: 86400000 + AN_HOUR_IN_MS * 24
  }
];
