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

import { create } from "zustand";

interface StatisticsState {
  numPnms: number;
  numStarredPnms: number;
  recentPnms: PNM[];

  setNumPnms: (numPnms: number) => void;
  setRecentPnms: (recentPnms: PNM[]) => void;
  setNumStarredPnms: (numStarredPnms: number) => void;
}

const useStatisticsStore = create<StatisticsState>((set) => ({
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
}));

export default useStatisticsStore;
