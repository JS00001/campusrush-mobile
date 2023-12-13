/*
 * Created on Mon Nov 13 2023
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

const defaultState = {
  fields: {
    name: "",
    school: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
};

interface RegistrationState {
  fields: (typeof defaultState)["fields"];

  resetState: () => void;

  setField: (field: keyof RegistrationState["fields"], value: string) => void;
}

const useRegistrationStore = create<RegistrationState>()((set) => ({
  /**
   * The fields for the registration form
   */
  ...defaultState,
  /**
   * Resets the state to its default values
   */
  resetState: () => set(() => defaultState),
  /**
   * Set a field in the registration form
   */
  setField: (field, value) =>
    set((state) => ({
      fields: {
        ...state.fields,
        [field]: value,
      },
    })),
}));

export default useRegistrationStore;
