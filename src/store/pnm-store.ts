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

interface IPnmState {
  pnms: IPNM[];
}

interface IPnmStore extends IPnmState {
  /** Clear the store */
  clear: () => void;
  /** Set the PNMs in the store */
  setPnms: (pnms: IPNM[]) => void;
  /** Get a PNM by ID */
  getPnm: (id: string) => IPNM | undefined;
  /** Add or update a PNM in the store */
  addOrUpdatePnm: (pnm: IPNM) => void;
  /** Delete a PNM from the store */
  deletePnm: (id: string) => void;
}

export const usePnmStore = create<IPnmStore>()(
  persist(
    (set, get) => {
      const initialState: IPnmState = {
        pnms: [],
      };

      /**
       * Clear the store
       */
      const clear = () => {
        return set({ ...initialState });
      };

      /**
       * Set the PNMs in the store
       */
      const setPnms = (pnms: IPNM[]) => {
        return set({ pnms });
      };

      /**
       * Get a PNM by their ID
       */
      const getPnm = (id: string) => {
        return get().pnms.find((pnm) => pnm._id === id);
      };

      /**
       * Add or update a pnm in the store
       */
      const addOrUpdatePnm = (pnm: IPNM) => {
        const pnms = [...get().pnms];
        const index = pnms.findIndex((p) => p._id === pnm._id);

        if (index === -1) {
          pnms.push(pnm);
        } else {
          pnms[index] = pnm;
        }

        return set({ pnms });
      };

      /**
       * Delete a PNM from the store
       */
      const deletePnm = (id: string) => {
        const pnms = get().pnms.filter((pnm) => pnm._id !== id);
        return set({ pnms });
      };

      return {
        ...initialState,
        clear,
        getPnm,
        setPnms,
        addOrUpdatePnm,
        deletePnm,
      };
    },
    {
      name: 'pnm-store',
      storage: customAsyncStorage as PersistStorage<IPnmStore>,
    },
  ),
);
