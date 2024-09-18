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

import customAsyncStorage from '@/lib/asyncStorage';

interface Statistic {
  current: number;
  change: number;
}

interface IAdminStatisticState {
  chapters: Statistic;
  proChapters: Statistic;
  pnms: Statistic;
  avgPnmsPerChapter: Statistic;
  conversations: Statistic;
  avgConversationsPerChapter: Statistic;
  messages: Statistic;
  avgMessagesPerConversation: Statistic;
}

interface IAdminStatisticsStore extends IAdminStatisticState {
  /** Clear the store, reset to initial values */
  clear(): void;
  /** Set the state or update parts of the state */
  setState(state: { [K in keyof IAdminStatisticState]: number }): void;
}

export const useAdminStatisticsStore = create<IAdminStatisticsStore>()(
  persist(
    (set, get) => {
      /**
       * Initial state of the store
       */
      const initialState = {
        chapters: {
          current: 0,
          change: 0,
        },
        proChapters: {
          current: 0,
          change: 0,
        },
        pnms: {
          current: 0,
          change: 0,
        },
        avgPnmsPerChapter: {
          current: 0,
          change: 0,
        },
        conversations: {
          current: 0,
          change: 0,
        },
        avgConversationsPerChapter: {
          current: 0,
          change: 0,
        },
        messages: {
          current: 0,
          change: 0,
        },
        avgMessagesPerConversation: {
          current: 0,
          change: 0,
        },
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
      const setState = (state: {
        [K in keyof IAdminStatisticState]: number;
      }) => {
        for (const key in state) {
          const current = state[key];
          const previous = get()[key].current;
          const change = current - previous;

          set((state) => ({
            ...state,
            [key]: {
              current,
              change,
            },
          }));
        }
      };

      return {
        ...initialState,
        clear,
        setState,
      };
    },
    {
      name: 'admin-statistics-store',
      storage: customAsyncStorage as PersistStorage<IAdminStatisticsStore>,
    },
  ),
);
