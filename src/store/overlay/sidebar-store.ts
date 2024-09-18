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
  isOpened: boolean;
  currentScreen: keyof MoreTabParams | null;
}

interface ISidebarStore extends ISidebarState {
  /** Clear the store */
  clear: () => void;
  /** Open the sidebar */
  openSidebar: () => void;
  /** Close the sidebar */
  closeSidebar: () => void;
  /** Set the screen */
  setCurrentScreen: (screen: keyof MoreTabParams | null) => void;
}

export const useSidebarStore = create<ISidebarStore>((set) => {
  const initialState: ISidebarState = {
    isOpened: false,
    currentScreen: null,
  };

  const clear = () => {
    set(initialState);
  };

  const setCurrentScreen = (screen: keyof MoreTabParams | null) => {
    set({ currentScreen: screen, isOpened: false });
  };

  const openSidebar = () => {
    set({ isOpened: true });
  };

  const closeSidebar = () => {
    set({ isOpened: false });
  };

  return {
    ...initialState,
    clear,
    setCurrentScreen,
    openSidebar,
    closeSidebar,
  };
});
