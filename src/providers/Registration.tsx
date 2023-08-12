/*
 * Created on Sat Aug 12 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { createContext, useReducer, useContext } from "react";

interface RegistrationState {
  schoolName: string;
  organizationName: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const initialState: RegistrationState = {
  schoolName: "",
  organizationName: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
};

const RegistrationContext = createContext<RegistrationState>(initialState);

type RegistrationAction =
  | { type: "schoolName"; payload: string }
  | { type: "organizationName"; payload: string }
  | { type: "email"; payload: string }
  | { type: "firstName"; payload: string }
  | { type: "lastName"; payload: string }
  | { type: "password"; payload: string };

const registrationReducer = (
  state: RegistrationState,
  action: RegistrationAction,
) => {
  switch (action.type) {
    case "schoolName":
      return { ...state, schoolName: action.payload };
    case "organizationName":
      return { ...state, organizationName: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "firstName":
      return { ...state, firstName: action.payload };
    case "lastName":
      return { ...state, lastName: action.payload };
    case "password":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

const RegistrationProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(registrationReducer, initialState);

  const setSchoolName = (schoolName: string) =>
    dispatch({ type: "schoolName", payload: schoolName });

  const setOrganizationName = (organizationName: string) =>
    dispatch({ type: "organizationName", payload: organizationName });

  const setEmail = (email: string) =>
    dispatch({ type: "email", payload: email });

  const setFirstName = (firstName: string) =>
    dispatch({ type: "firstName", payload: firstName });

  const setLastName = (lastName: string) =>
    dispatch({ type: "lastName", payload: lastName });

  const setPassword = (password: string) =>
    dispatch({ type: "password", payload: password });

  return (
    <RegistrationContext.Provider value={state}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => useContext(RegistrationContext);

export default RegistrationProvider;
