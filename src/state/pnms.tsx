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

import { create } from 'zustand';

interface PnmsState {
  pnms: PNM[];

  addPnms: (pnm: PNM[]) => void;
  updatePnm: (pnm: PNM) => void;
  deletePnm: (pnm: PNM) => void;
  setPnms: (pnms: PNM[]) => void;
}

const usePnmsStore = create<PnmsState>((set) => ({
  /**
   * The list of PNMs to be stored in the store
   */
  pnms: [],
  /**
   * Adds a list of PNMs to the store
   */
  addPnms: (pnms) =>
    set((state) => {
      const newPnms = pnms.filter(
        (p) => !state.pnms.find((p2) => p2._id === p._id),
      );

      return {
        pnms: [...state.pnms, ...newPnms],
      };
    }),
  /**
   * Sets the list of PNMs in the store
   */
  setPnms: (pnms) =>
    set(() => ({
      pnms,
    })),
  /**
   * Updates a PNM in the store if its id exists
   */
  updatePnm: (pnm) =>
    set((state) => ({
      pnms: state.pnms.map((p) => (p._id === pnm._id ? pnm : p)),
    })),
  /**
   * Deletes a PNM from the store if its id exists
   */
  deletePnm: (pnm) =>
    set((state) => ({
      pnms: state.pnms.filter((p) => p._id !== pnm._id),
    })),
}));

export default usePnmsStore;
