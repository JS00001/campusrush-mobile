/*
 * Created on Sun Oct 22 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import customAsyncStorage from "@/lib/asyncStorage";
import { create } from "zustand";
import { PersistStorage, persist } from "zustand/middleware";

interface StatisticsState {
  numPnms: number;
  numStarredPnms: number;
  recentPnms: PNM[];

  clearStatistics: () => void;
  setNumPnms: (numPnms: number) => void;
  setRecentPnms: (recentPnms: PNM[]) => void;
  setNumStarredPnms: (numStarredPnms: number) => void;
  incrementNumPnms: () => void;
  incrementNumStarredPnms: () => void;
  decrementNumPnms: () => void;
  decrementNumStarredPnms: () => void;
  addRecentPnm: (pnm: PNM) => void;
}

const useStatisticsStore = create<StatisticsState>()(
  persist(
    (set) => ({
      /**
       * The number of PNMs in the system
       */
      numPnms: 0,
      /**
       * The number of starred PNMs in the system
       */
      numStarredPnms: 0,
      /**
       * The list of recent PNMs
       */
      recentPnms: [],
      /**
       * Sets the number of PNMs in the system
       */
      setNumPnms: (numPnms) => set(() => ({ numPnms })),
      /**
       * Sets the number of starred PNMs in the system
       */
      setNumStarredPnms: (numStarredPnms) => set(() => ({ numStarredPnms })),
      /**
       * Sets the list of recent PNMs
       */
      setRecentPnms: (recentPnms) => set(() => ({ recentPnms })),
      /**
       * Clears the statistics
       */
      clearStatistics: () =>
        set(() => ({
          numPnms: 0,
          numStarredPnms: 0,
          recentPnms: [],
        })),
      /**
       * Increments the number of PNMs in the system
       */
      incrementNumPnms: () => set((state) => ({ numPnms: state.numPnms + 1 })),
      /**
       * Increments the number of starred PNMs in the system
       */
      incrementNumStarredPnms: () =>
        set((state) => ({ numStarredPnms: state.numStarredPnms + 1 })),
      /**
       * Decrements the number of PNMs in the system
       */
      decrementNumPnms: () => set((state) => ({ numPnms: state.numPnms - 1 })),
      /**
       * Decrements the number of starred PNMs in the system
       */
      decrementNumStarredPnms: () =>
        set((state) => ({ numStarredPnms: state.numStarredPnms - 1 })),
      /**
       * Adds a PNM to the list of recent PNMs
       */
      addRecentPnm: (pnm) =>
        set((state) => ({ recentPnms: [pnm, ...state.recentPnms] })),
    }),
    {
      name: "statistics",
      storage: customAsyncStorage as PersistStorage<StatisticsState>,
    },
  ),
);

export default useStatisticsStore;
