/*
 * Created on Sat Feb 24 2024
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

interface IForgotPasswordState {
  email?: string;
  code?: string;
  password?: string;
  confirmPassword?: string;
}

interface IForgotPasswordStore extends IForgotPasswordState {
  /** Clear the store */
  clear: () => void;
  /** Set a field in the store */
  setField: (field: keyof IForgotPasswordState, value?: string) => void;
}

export const useForgotPasswordStore = create<IForgotPasswordStore>((set) => {
  const initialState: IForgotPasswordState = {
    email: undefined,
    code: undefined,
    password: undefined,
    confirmPassword: undefined,
  };

  /**
   * Clears the forgot password store
   */
  const clear = () => {
    return set(initialState);
  };

  /**
   * Updates a field in the forgot password store
   */
  const setField = (field: keyof IForgotPasswordStore, value?: string) => {
    return set((state) => ({
      ...state,
      [field]: value,
    }));
  };

  return {
    ...initialState,
    clear,
    setField,
  };
});
