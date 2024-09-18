/*
 * Created on Sat Feb 24 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { create } from 'zustand';
import { PersistStorage, persist } from 'zustand/middleware';

import type { IPNM } from '@/types';

import customAsyncStorage from '@/lib/async-storage';

interface IStatisticsState {
  pnmCount: number;
  starredPnmCount: number;
  recentPnms: IPNM[];
}

interface IStatisticsStore extends IStatisticsState {
  /** Clear the store */
  clear(): void;
  /** Set a field in the store */
  setField(field: keyof IStatisticsState, value: any): void;
  /** Increment a field in the store */
  incrementField(field: 'pnmCount' | 'starredPnmCount'): void;
  /** Decrement a field in the store */
  decrementField(field: 'pnmCount' | 'starredPnmCount'): void;
}

export const useStatisticsStore = create<IStatisticsStore>()(
  persist(
    (set) => {
      const initialState: IStatisticsState = {
        pnmCount: 0,
        starredPnmCount: 0,
        recentPnms: [],
      };
      /**
       * Clears the store
       */
      const clear = () => {
        return set(initialState);
      };

      /**
       * Sets or updates a field in the store
       */
      const setField = (field: keyof IStatisticsStore, value: any) => {
        return set((state) => ({
          ...state,
          [field]: value,
        }));
      };

      /**
       * Increments a field in the store
       */
      const incrementField = (field: 'pnmCount' | 'starredPnmCount') => {
        return set((state) => ({
          ...state,
          [field]: state[field] + 1,
        }));
      };

      /**
       * Decrements a field in the store
       */
      const decrementField = (field: 'pnmCount' | 'starredPnmCount') => {
        return set((state) => ({
          ...state,
          [field]: state[field] - 1,
        }));
      };

      return {
        ...initialState,
        clear,
        setField,
        incrementField,
        decrementField,
      };
    },
    {
      name: 'statistics-store',
      storage: customAsyncStorage as PersistStorage<IStatisticsStore>,
    },
  ),
);
