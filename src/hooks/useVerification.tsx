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
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";

import authAPI from "@/api/auth";
import errors from "@/lib/errors";
import validators from "@/lib/validators";
import { useAuth } from "@/providers/Auth";

const useVerification = () => {
  const { accessToken, updateOrganization } = useAuth();

  const verifyOrganizationMutation = useMutation({
    mutationFn: (input: VerifyOrganizationInput) => {
      return authAPI.verifyOrganization({
        ...input,
        accessToken: accessToken || "",
      });
    },
  });

  const resendVerificationEmailMutation = useMutation({
    mutationFn: () => {
      return authAPI.resendVerification({
        accessToken: accessToken || "",
      });
    },
  });

  const form = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: async (values: VerifyOrganizationInput) => {
      onSubmit(values);
    },
  });

  // The function to run when the form is submitted
  const onSubmit = async (values: typeof form.values) => {
    // The response from the server
    let response;

    try {
      // Attempt to update the organization
      response = await verifyOrganizationMutation.mutateAsync(values);
    } catch (error) {
      errors.handleApiError(error, form);
    }
    // If there was an error, prevent the "success" code from running
    if (!response) return;

    // Get the updated organization from the response
    let updatedOrganization = response?.data.data.organization;

    // Update the organization in the auth context
    if (updatedOrganization) {
      updateOrganization(updatedOrganization);
    }

    // Reset the form
    form.resetForm();

    // Show a success message
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Your organization has been verified.",
    });
  };

  // The function to run when the "Resend" button is pressed
  const resendVerificationEmail = async () => {
    // The response from the server
    let response;

    try {
      // Attempt to resend the verification email
      response = await resendVerificationEmailMutation.mutateAsync();
    } catch (error) {
      errors.handleApiError(error, form);
    }
    // If there was an error, prevent the "success" code from running
    if (!response) return;

    // Show a success message
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Resent verification email.",
    });
  };

  // The validation function, takes certain fields so we dont update all errors at once
  const validateFields = (fields: (keyof VerifyOrganizationInput)[]) => {
    // Get the errors from the validator
    // This will return ALL errors, even ones from different steps
    const errors = validators.validateVerifyOrganization(form.values) as any;

    // Remove any items in the object that arent in the fields array
    // This is to prevent errors from showing up on other steps
    Object.keys(errors).forEach((key) => {
      if (!fields.includes(key as any)) {
        delete (errors as any)[key];
      }
    });

    // Set the field errors that apply to the provided fields
    fields.forEach((field) => {
      if (errors[field]) {
        form.setFieldError(field, errors[field]);
      } else {
        form.setFieldError(field, "");
      }
    });

    // Check if there are any errors with the provided fields
    const hasErrors = !Object.values(errors).some((error) => error !== "");

    // Return whether or not there are errors
    return hasErrors;
  };

  return {
    isLoading:
      verifyOrganizationMutation.isLoading ||
      resendVerificationEmailMutation.isLoading,
    errors: form.errors,
    code: form.values.code,
    validateFields,
    setCode: (code: string) => form.setFieldValue("code", code),
    handleSubmission: () => form.handleSubmit(),
    resendVerificationEmail: () => resendVerificationEmail(),
  };
};

export default useVerification;
