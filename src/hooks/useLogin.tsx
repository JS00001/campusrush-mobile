/*
 * Created on Fri Aug 11 2023
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
import { useMutation } from "@tanstack/react-query";

import authAPI from "@/api/auth";
import errors from "@/lib/errors";
import { useAuth } from "@/providers/Auth";
import usePosthog from "@/hooks/usePosthog";
import validators from "@/lib/validation/validators";

const useLogin = () => {
  const { signIn } = useAuth();
  const posthog = usePosthog();

  const mutation = useMutation({
    mutationFn: (input: LoginAsOrganizationInput) => {
      return authAPI.loginAsOrganization(input);
    },
  });

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: validators.validateLogin,
    onSubmit: async (values: LoginAsOrganizationInput) => {
      onSubmit(values);
    },
  });

  // The function to run when the form is submitted
  const onSubmit = async (values: typeof form.values) => {
    // The response from the server
    let response;

    try {
      // Attempt to login the organization
      response = await mutation.mutateAsync(values);
    } catch (error) {
      errors.handleApiError(error, form);
    }
    // If there was an error, prevent the "success" code from running
    if (!response) return;

    // Capture the event in analytics
    posthog.capture("login", {
      email: values.email,
    });

    // Login the user from the auth provider
    signIn(response);
  };

  return {
    errors: form.errors,
    isLoading: mutation.isLoading,

    email: form.values.email,
    password: form.values.password,
    handleSubmission: () => {
      form.handleSubmit();
    },
    setEmail: (email: string) => form.setFieldValue("email", email),
    setPassword: (password: string) => form.setFieldValue("password", password),
  };
};

export default useLogin;
