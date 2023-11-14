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

  clearContacts: () => void;

  setContacts(field: ContactType, pnms: PNM[]): void;
  addContactTo(field: ContactType, pnm: PNM): void;
  addContactsTo(field: ContactType, pnms: PNM[]): void;
  removeContactFrom(field: ContactType, pnm: PNM): void;
  removeContactsFrom(field: ContactType, pnms: PNM[]): void;
}

const useContactsStore = create<ContactsState>()(
  persist(
    (set) => ({
      /**
       * The list of all PNMs
       */
      allPnms: [],
      /**
       * The list of starred PNMs
       */
      starredPnms: [],
      /**
       * The list of suggested PNMs
       */
      suggestedPnms: [],
      /**
       * The list of uncontacted PNMs
       */
      uncontactedPnms: [],
      /**
       * Clears all the contacts
       */
      clearContacts: () =>
        set((state) => ({
          allPnms: [],
          starredPnms: [],
          suggestedPnms: [],
          uncontactedPnms: [],
        })),
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
      removeContactFrom: (field, pnm) =>
        set((state) => ({
          [field]: state[field].filter((p) => p._id !== pnm._id),
        })),
      /**
       * Removes a list of PNMs from a field
       */
      removeContactsFrom: (field, pnms) =>
        set((state) => ({
          [field]: state[field].filter(
            (p) => !pnms.some((pnm) => pnm._id === p._id),
          ),
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
      name: "contacts",
      storage: customAsyncStorage as PersistStorage<ContactsState>,
    },
  ),
);

export default useContactsStore;
