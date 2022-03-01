import type { StreamResponseData } from '../types';
import { writable } from 'svelte/store';

export const ADATickers = writable<StreamResponseData[]>([]);

export const ADARouter = (data: StreamResponseData) => {
  ADATickers.update((array) => [...array, data]);
};
