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

import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";

import authApi from "@/api/auth";
import errors from "@/lib/errors";
import validate from "@/lib/validation";
import { useAuth } from "@/providers/Auth";
import validators from "@/lib/validation/validators";
import useRegistrationStore from "@/state/registration";

const useRegistration = () => {
  const { signUp } = useAuth();

  const storeFields = useRegistrationStore((state) => state.fields);
  const setStoreField = useRegistrationStore((state) => state.setField);
  const resetState = useRegistrationStore((state) => state.resetState);

  const verifyEmailMutation = useMutation({
    mutationFn: (input: CheckEmailExistsInput) => {
      return authApi.checkEmailExists(input);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (input: RegisterAsChapterInput) => {
      return authApi.registerAsChapter(input);
    },
  });

  // The form to store registration values a cross all 3 steps
  const form = useFormik({
    initialValues: {
      ...storeFields,
    },
    // When the form is submitted, call the signUp method from the auth context
    // Only call onSubmit from the final screen
    onSubmit: async (values) => {
      onSubmit(values);
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

  // Ensure the email is not already in use
  const validateEmail = async (email: string) => {
    // The response from the server
    let response;

    try {
      // Attempt to check if the email exists
      response = await verifyEmailMutation.mutateAsync({ email });
    } catch (error) {
      errors.handleApiError(error, form);
    }

    // If there was an error, prevent the "success" code from running
    if (!response) return;

    const emailExists = response.data.data.exists;

    // If the email exists, set the error
    if (emailExists) {
      form.setFieldError("email", "Email already in use");
    }

    return !emailExists;
  };

  // The function to handle a form field change
  const setField = (field: keyof typeof form.values, value: string) => {
    setStoreField(field, value);
    form.setFieldValue(field, value);
  };

  // The function to run when the form is submitted
  const onSubmit = async (values: typeof form.values) => {
    // The response from the server
    let response;

    try {
      // Attempt to login the chapter
      response = await registerMutation.mutateAsync(values);
    } catch (error) {
      errors.handleApiError(error, form);
    }

    // If there was an error, prevent the "success" code from running
    if (!response) return;

    // Clear the fields
    resetState();

    // Login the user from the auth provider
    signUp(response);
  };

  return {
    ...form.values,
    errors: form.errors,
    isLoading: registerMutation.isLoading || verifyEmailMutation.isLoading,

    setField,
    validateEmail,
    validateFields,
    handleSubmission: () => form.handleSubmit(),
  };
};

export default useRegistration;
