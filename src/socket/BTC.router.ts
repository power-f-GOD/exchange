import type { StreamResponseData } from '../types';
import { writable } from 'svelte/store';

export const BTCTickers = writable<StreamResponseData[]>([]);

export const BTCRouter = (data: StreamResponseData) => {
  BTCTickers.update((array) => [...array, data]);
};
