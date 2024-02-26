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
import { useEffect } from 'react';
import { PersistStorage, persist } from 'zustand/middleware';

import customAsyncStorage from '@/lib/asyncStorage';
import { useGetChapterStatistics } from '@/hooks/api/chapter';

interface IStatisticsStore {
  pnmCount: number;
  starredPnmCount: number;
  recentPnms: PNM[];

  clear(): void;
  setField(field: keyof IStatisticsStore, value: any): void;
  incrementField(field: 'pnmCount' | 'starredPnmCount'): void;
  decrementField(field: 'pnmCount' | 'starredPnmCount'): void;
}

export const useStatisticsZustandStore = create<IStatisticsStore>()(
  persist(
    (set) => {
      /**
       * Initial state of the store
       */
      const initialState = {
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

export const useStatisticsStore = () => {
  const query = useGetChapterStatistics();
  const store = useStatisticsZustandStore();

  /**
   * Update the store when the query data changes
   */
  useEffect(() => {
    if (!query.data || 'error' in query.data) return;

    store.setField('pnmCount', query.data.data.pnms);
    store.setField('starredPnmCount', query.data.data.starredPnms);
    store.setField('recentPnms', query.data.data.recentPnms);
  }, [query.data]);

  return {
    ...query,
    ...store,
  };
};
