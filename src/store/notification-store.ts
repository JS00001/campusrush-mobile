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
import { persist, PersistStorage } from 'zustand/middleware';

import { INotification } from '@/@types';
import customAsyncStorage from '@/lib/async-storage';

interface INotificationState {
  /** The number of unread notifications (minus messages) */
  count: number;
  /** The notifications */
  notifications: INotification[];
}

interface INotificationStore extends INotificationState {
  /** Clear the store */
  clear: () => void;
  /** Set a field in the store */
  setState: (data: Partial<INotificationState>) => void;
  /** Add or update a notification in the store */
  addOrUpdateNotification: (notification: INotification) => void;
}

export const useNotificationStore = create<INotificationStore>()(
  persist(
    (set, get) => {
      const initialState = {
        count: 0,
        notifications: [],
      };

      /**
       * Clear the store
       */
      const clear = () => {
        return set(initialState);
      };

      /**
       * Update the notification state
       */
      const setState = (data: Partial<INotificationState>) => {
        return set((state) => {
          return {
            ...state,
            ...data,
          };
        });
      };

      /**
       * Edit in place (same position) if the notification._id exists
       * else, add to the beginning of the array
       */
      const addOrUpdateNotification = (notification: INotification) => {
        return set((state) => {
          const index = state.notifications.findIndex((n) => {
            return n._id === notification._id;
          });

          // If the notification does not exist, add it and update the count
          if (index === -1) {
            return {
              ...state,
              count: state.count + 1,
              notifications: [notification, ...state.notifications],
            };
          }

          state.notifications[index] = notification;

          return {
            ...state,
            notifications: [...state.notifications],
          };
        });
      };

      return {
        ...initialState,
        clear,
        setState,
        addOrUpdateNotification,
      };
    },
    {
      name: 'notification-store',
      storage: customAsyncStorage as PersistStorage<INotificationStore>,
    },
  ),
);
