/*
 * Created on Sat Aug 31 2024
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

interface IImageZoomStore {
  image?: string;
  clear: () => void;
  setImage: (image: string) => void;
}

export const useImageZoomStore = create<IImageZoomStore>()((set) => {
  const initialState = {
    image: undefined,
  };

  const clear = () => {
    set(initialState);
  };

  const setImage = (image: string) => {
    set({ image });
  };

  return {
    ...initialState,
    clear,
    setImage,
  };
});
