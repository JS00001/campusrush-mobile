/*
 * Created on Thu Feb 29 2024
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

type Status = 'idle' | 'loading';

interface IStatusStore {
  status: Status;
  clear: () => void;
  setStatusOverlay: (status: Status) => void;
}

export const useStatusStore = create<IStatusStore>()((set) => {
  const initialState: { status: Status } = {
    status: 'idle',
  };

  const clear = () => {
    set(initialState);
  };

  const setStatusOverlay = (status: Status) => {
    set({ status });
  };

  return {
    ...initialState,
    clear,
    setStatusOverlay,
  };
});
