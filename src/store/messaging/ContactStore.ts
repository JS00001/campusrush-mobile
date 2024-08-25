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

interface IContactStore {
  all: IPNM[];
  starred: IPNM[];
  suggested: IPNM[];
  uncontacted: IPNM[];

  clear: () => void;

  setContacts: (field: keyof IContactStore, value: IPNM[]) => void;
  addContacts: (field: keyof IContactStore, value: IPNM[] | IPNM) => void;
  removeContacts: (field: keyof IContactStore, value: IPNM[] | IPNM) => void;
}

export const useContactStore = create<IContactStore>()(
  persist(
    (set, get) => {
      /**
       * Initial state of the store
       */
      const initialState = {
        all: [],
        starred: [],
        suggested: [],
        uncontacted: [],
      };

      /**
       * Clears the store
       */
      const clear = () => {
        return set(initialState);
      };

      /**
       * Set the contacts in the store
       */
      const setContacts = (field: keyof IContactStore, value: IPNM[]) => {
        return set((state) => ({
          ...state,
          [field]: value,
        }));
      };

      /**
       * Add contacts to the store (either a single contact or an array of contacts)
       * Do not add any duplicates
       */
      const addContacts = (
        field: keyof IContactStore,
        value: IPNM[] | IPNM,
      ) => {
        return set((state) => {
          const contacts = Array.isArray(value) ? value : [value];
          const newContacts = (state[field] as IPNM[]).concat(contacts);

          return {
            ...state,
            [field]: Array.from(new Set(newContacts)),
          };
        });
      };

      /**
       * Remove contacts from the store (either a single contact or an array of contacts)
       */
      const removeContacts = (
        field: keyof IContactStore,
        value: IPNM[] | IPNM,
      ) => {
        return set((state) => {
          const contacts = Array.isArray(value) ? value : [value];
          const newContacts = (state[field] as IPNM[]).filter(
            (contact) => !contacts.includes(contact),
          );

          return {
            ...state,
            [field]: newContacts,
          };
        });
      };

      return {
        ...initialState,
        clear,
        setContacts,
        addContacts,
        removeContacts,
      };
    },
    {
      name: 'contact-store',
      storage: customAsyncStorage as PersistStorage<IContactStore>,
    },
  ),
);

// export const useContactStore = () => {
//   const query = useGetContacts();
//   const store = useContactZustandStore();

//   /**
//    * Update the store when the query data changes
//    */
//   useEffect(() => {
//     if (!query.data || 'error' in query.data) return;

//     store.setContacts('all', query.data.data.all);
//     store.setContacts('starred', query.data.data.favorited);
//     store.setContacts('suggested', query.data.data.suggested);
//     store.setContacts('uncontacted', query.data.data.uncontacted);
//   }, [query.data]);

//   return {
//     ...query,
//     ...store,
//   };
// };
