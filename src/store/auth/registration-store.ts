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

interface IRegistrationState {
  name?: string;
  school?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface IRegistrationStore extends IRegistrationState {
  /** Clear the store */
  clear: () => void;
  /** Set a field in the store */
  setField: (field: keyof IRegistrationState, value?: string) => void;
}

export const useRegistrationStore = create<IRegistrationStore>((set) => {
  const initialState: IRegistrationState = {
    name: undefined,
    school: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
  };

  /**
   * Clears the registration store
   */
  const clear = () => {
    return set(initialState);
  };

  /**
   * Updates a field in the registration store
   */
  const setField = (field: keyof IRegistrationStore, value?: string) => {
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
