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

import { useFormik } from "formik";
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import authAPI from "@/api/auth";
import { useAuth } from "@/providers/Auth";

interface RegistrationState {
  schoolName: string;
  organizationName: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

interface RegistrationContext extends RegistrationState {
  isLoading: boolean;
  schools?: String[];
  organizations?: String[];

  handleSubmission: () => void;
  setSchoolName: (schoolName: string) => void;
  setOrganizationName: (organizationName: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
}

const RegistrationContext = createContext<RegistrationContext>({} as any);

const RegistrationProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { signUp, isLoading } = useAuth();

  const query = useQuery({
    queryKey: ["getOrganizations"],
    queryFn: () => {
      return authAPI.getOrganizations();
    },
  });

  const form = useFormik({
    initialValues: {
      schoolName: "",
      organizationName: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
    onSubmit: async (values) => {
      // Map values to input
      const input: RegisterAsOrganizationInput = {
        name: values.organizationName,
        email: values.email,
        password: values.password,
        school: values.schoolName,
        firstName: values.firstName,
        lastName: values.lastName,
      };

      await signUp(input);
    },
  });

  return (
    <RegistrationContext.Provider
      value={{
        ...form.values,
        handleSubmission: () => form.handleSubmit(),
        isLoading: form.isSubmitting || isLoading || query.isLoading,
        schools: query?.data?.data?.data.schools,
        organizations: query?.data?.data?.data.organizations,
        setSchoolName: form.setFieldValue.bind(null, "schoolName"),
        setOrganizationName: form.setFieldValue.bind(null, "organizationName"),
        setEmail: form.setFieldValue.bind(null, "email"),
        setPassword: form.setFieldValue.bind(null, "password"),
        setConfirmPassword: form.setFieldValue.bind(null, "confirmPassword"),
        setFirstName: form.setFieldValue.bind(null, "firstName"),
        setLastName: form.setFieldValue.bind(null, "lastName"),
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => useContext(RegistrationContext);

export default RegistrationProvider;
