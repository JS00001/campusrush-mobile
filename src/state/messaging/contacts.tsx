/*
 * Created on Tue Nov 14 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { create } from "zustand";
import { PersistStorage, persist } from "zustand/middleware";

import customAsyncStorage from "@/lib/asyncStorage";

const defaultState = {
  allPnms: [],
  starredPnms: [],
  suggestedPnms: [],
  uncontactedPnms: [],
};

type ContactType =
  | "allPnms"
  | "starredPnms"
  | "suggestedPnms"
  | "uncontactedPnms";

interface ContactsState {
  allPnms: PNM[];
  starredPnms: PNM[];
  suggestedPnms: PNM[];
  uncontactedPnms: PNM[];

  resetState: () => void;

  setContacts(field: ContactType, pnms: PNM[]): void;
  addContactTo(field: ContactType, pnm: PNM): void;
  addContactsTo(field: ContactType, pnms: PNM[]): void;
  removeContactFrom(field: ContactType, pnmId: string): void;
  removeContactsFrom(field: ContactType, pnmsIds: string[]): void;
}

const useContactsStore = create<ContactsState>()(
  persist(
    (set) => ({
      ...defaultState,
      /**
       * Resets the state to the default state
       */
      resetState: () => set(() => defaultState),
      /**
       * Adds a PNM to a field
       */
      addContactTo: (field, pnm) =>
        set((state) => ({
          [field]: [...state[field], pnm],
        })),
      /**
       * Adds a list of PNMs to a field
       */
      addContactsTo: (field, pnms) =>
        set((state) => ({
          [field]: [...state[field], ...pnms],
        })),
      /**
       * Removes a PNM from a field
       */
      removeContactFrom: (field, pnmId) =>
        set((state) => ({
          [field]: state[field].filter((p) => p._id !== pnmId),
        })),
      /**
       * Removes a list of PNMs from a field
       */
      removeContactsFrom: (field, pnmsIds) =>
        set((state) => ({
          [field]: state[field].filter((p) => !pnmsIds.includes(p._id)),
        })),
      /**
       * Sets the PNMs in a field
       */
      setContacts: (field, pnms) =>
        set(() => ({
          [field]: pnms,
        })),
    }),
    {
      name: "contacts-store",
      storage: customAsyncStorage as PersistStorage<ContactsState>,
    },
  ),
);

export default useContactsStore;
