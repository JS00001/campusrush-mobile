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

interface IForgotPasswordStore {
  email?: string;
  code?: string;
  password?: string;
  confirmPassword?: string;
  clear: () => void;
  setField: (field: keyof IForgotPasswordStore, value?: string) => void;
}

export const useForgotPasswordStore = create<IForgotPasswordStore>((set) => {
  /**
   * Initial state for the forgot password store
   */
  const initialState = {
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
