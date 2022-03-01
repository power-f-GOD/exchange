import type { StreamResponseData } from '../types';
import { writable } from 'svelte/store';

export const ETHTickers = writable<StreamResponseData[]>([]);

export const ETHRouter = (data: StreamResponseData) => {
  ETHTickers.update((array) => [...array, data]);
};
