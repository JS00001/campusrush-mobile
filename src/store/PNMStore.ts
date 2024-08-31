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

import customAsyncStorage from '@/lib/asyncStorage';

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
       * Clears the store
       */
      const clear = () => {
        return set(initialState);
      };

      /**
       * Set the PNMs in the store
       */
      const setPnms = (pnms: IPNM[]) => {
        return set({ pnms });
      };

      /**
       * Get a PNM by ID
       */
      const getPnm = (id: string) => {
        const pnm = get().pnms.find((pnm) => pnm._id === id);

        return pnm;
      };

      /**
       * Add a PNM to the store if it doesn't exist, or update it if it does
       */
      const addOrUpdatePnm = (pnm: IPNM) => {
        const pnmExists = get().pnms.some((p) => p._id === pnm._id);

        // If the pnm exists, we update rather than add
        if (pnmExists) {
          const pnms = get().pnms.map((p) => (p._id === pnm._id ? pnm : p));

          return set({ pnms });
        }

        return set({ pnms: [...get().pnms, pnm] });
      };

      /**
       * Delete a PNM from the store
       */
      const deletePnm = (id: string) => {
        const pnms = get().pnms.filter((p) => p._id !== id);

        return set({ pnms });
      };

      return {
        ...initialState,
        clear,
        setPnms,
        getPnm,
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

// export const usePnmStore = () => {
//   const query = useGetPnms();
//   const store = usePnmZustandStore();

//   useEffect(() => {
//     if (!query.data || 'error' in query.data) return;

//     store.setPnms(query.data.data.pnms);
//   }, [query.data]);

//   return {
//     ...query,
//     ...store,
//   };
// };

// export const usePnm = (id: string) => {
//   const query = useGetPnm(id);
//   const store = usePnmZustandStore();

//   const pnm = store.getPnm(id);

//   useEffect(() => {
//     if (!query.data || 'error' in query.data) return;

//     store.updatePnm(query.data.data.pnm);
//   }, [query.data]);

//   return {
//     pnm,
//     ...query,
//     ...store,
//   };
// };
