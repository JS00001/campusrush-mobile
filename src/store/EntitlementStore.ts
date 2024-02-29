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

interface IEntitlementStore {
  entitlements?: EntitlementDetails;
  setEntitlements: (entitlements: EntitlementDetails) => void;
}

export const useEntitlementStore = create<IEntitlementStore>()(
  persist(
    (set) => {
      /**
       * The initial state of the store
       */
      const initialState = {
        entitlements: undefined,
      };

      /**
       * Set the entitlements in the store
       */
      const setEntitlements = (entitlements: EntitlementDetails) => {
        return set({ entitlements });
      };

      return {
        ...initialState,
        setEntitlements,
      };
    },
    {
      name: 'entitlement-store',
      storage: customAsyncStorage as PersistStorage<IEntitlementStore>,
    },
  ),
);
