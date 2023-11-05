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
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

import authAPI from "@/api/auth";
import validate from "@/lib/validation";
import { useAuth } from "@/providers/Auth";
import validators from "@/lib/validation/validators";

interface RegistrationContextProps extends RegisterAsOrganizationInput {
  // Status Items
  isLoading: boolean;
  errors: Record<string, string>;

  // Data Items
  schools: string[];
  organizations: string[];

  // Form Methods
  handleSubmission: () => void;
  validateFields: (fields: (keyof RegisterAsOrganizationInput)[]) => boolean;

  // Form Setters
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setSchool: (schoolName: string) => void;
  setPassword: (password: string) => void;
  setLastName: (lastName: string) => void;
  setFirstName: (firstName: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
}

// Create the context
const RegistrationContext = createContext<RegistrationContextProps>({} as any);

const RegistrationProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  // We need to access the auth context to get the signUp method and loading state
  const { signUp, isLoading } = useAuth();

  // Get the schools and organizations from the API
  // This will only run once and be cached
  const query = useQuery({
    queryKey: ["getOrganizations"],
    queryFn: () => {
      return authAPI.getOrganizations();
    },
  });

  // Dont allow for an undefined organizations array
  const organizations = query?.data?.data?.data.organizations || [];
  // Dont allow for an undefined schools array
  const schools = query?.data?.data?.data.schools || [];

  // The form to store registration values a cross all 3 steps
  const form = useFormik({
    initialValues: {
      name: "",
      school: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
    // When the form is submitted, call the signUp method from the auth context
    // Only call onSubmit from the final screen
    onSubmit: async (values) => {
      await signUp(values);
    },
  });

  // The validation function, takes certain fields so we dont update all errors at once
  const validateFields = (fields: (keyof typeof form.values)[]) => {
    return validate({
      form,
      fields,
      values: form.values,
      validatorFn: validators.validateRegistration,
    });
  };

  return (
    <RegistrationContext.Provider
      value={{
        // Status Items
        errors: form.errors,
        isLoading: form.isSubmitting || isLoading || query.isLoading,

        // Data Items
        schools,
        organizations,
        ...form.values,

        // Form Methods
        validateFields,
        handleSubmission: () => form.handleSubmit(),

        // Form Setters
        setSchool: (schoolName: string) => {
          form.setFieldValue("school", schoolName);
        },
        setName: (name: string) => {
          form.setFieldValue("name", name);
        },
        setEmail: (email: string) => {
          form.setFieldValue("email", email);
        },
        setPassword: (password: string) => {
          form.setFieldValue("password", password);
        },
        setConfirmPassword: (confirmPassword: string) => {
          form.setFieldValue("confirmPassword", confirmPassword);
        },
        setFirstName: (firstName: string) => {
          form.setFieldValue("firstName", firstName);
        },
        setLastName: (lastName: string) => {
          form.setFieldValue("lastName", lastName);
        },
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

// Create a hook to use the context
export const useRegistration = () => useContext(RegistrationContext);

export default RegistrationProvider;
