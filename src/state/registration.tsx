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

const initialFormFields = {
  name: "",
  school: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

interface RegistrationState {
  fields: typeof initialFormFields;

  clearFields: () => void;
  setField: (field: keyof RegistrationState["fields"], value: string) => void;
}

const useRegistrationStore = create<RegistrationState>()((set) => ({
  /**
   * The fields for the registration form
   */
  fields: {
    ...initialFormFields,
  },
  /**
   * Clear the registration fields
   */
  clearFields: () =>
    set({
      fields: {
        ...initialFormFields,
      },
    }),
  /**
   * Set a field in the registration form
   */
  setField: (field, value) =>
    set((state) => ({ fields: { ...state.fields, [field]: value } })),
}));

export default useRegistrationStore;
