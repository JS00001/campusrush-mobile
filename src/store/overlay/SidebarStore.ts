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

import type { MoreTabParams } from '@/navigation/@types';

interface ISidebarState {
  opened: boolean;
  screen?: keyof MoreTabParams;
}

interface ISidebarStore extends ISidebarState {
  /** Clear the store */
  clear: () => void;
  /** Set the screen */
  setScreen: (screen?: keyof MoreTabParams) => void;
  /** Open the sidebar */
  openSidebar: () => void;
  /** Close the sidebar */
  closeSidebar: () => void;
}

export const useSidebarStore = create<ISidebarStore>((set) => {
  const initialState: ISidebarState = {
    opened: false,
    screen: undefined,
  };

  const clear = () => {
    set(initialState);
  };

  const setScreen = (screen?: keyof MoreTabParams) => {
    set({ screen, opened: false });
  };

  const openSidebar = () => {
    set({ opened: true });
  };

  const closeSidebar = () => {
    set({ opened: false });
  };

  return {
    ...initialState,
    clear,
    setScreen,
    openSidebar,
    closeSidebar,
  };
});
