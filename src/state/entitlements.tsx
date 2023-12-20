/*
 * Created on Wed Nov 08 2023
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

import type { EntitlementDetails } from "@/types/interfaces/EntitlementInterfaces";

import customAsyncStorage from "@/lib/asyncStorage";

interface EntitlementsState {
  entitlementDetails: EntitlementDetails | null;
  setEntitlementDetails: (entitlementDetails: EntitlementDetails) => void;
}

const useEntitlementsStore = create<EntitlementsState>()(
  persist(
    (set) => ({
      entitlementDetails: null,
      setEntitlementDetails: (entitlementDetails) =>
        set({ entitlementDetails }),
    }),
    {
      name: "entitlements-store",
      storage: customAsyncStorage as PersistStorage<EntitlementsState>,
    },
  ),
);

export default useEntitlementsStore;
