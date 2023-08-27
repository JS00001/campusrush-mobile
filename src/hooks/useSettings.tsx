/*
 * Created on Sun Aug 27 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { AxiosError } from "axios";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";

import validators from "@/lib/validators";
import { useAuth } from "@/providers/Auth";
import organizationApi from "@/api/api/organization";

const useSettings = () => {
  const { organization, updateOrganization } = useAuth();

  // Create the mutation for updating the organization
  const mutation = useMutation({
    mutationFn: (input: UpdateOrganizationInput) => {
      return organizationApi.updateOrganization(input);
    },
  });

  // Create a form
  const form = useFormik({
    initialValues: {
      firstName: organization?.firstName || "",
      lastName: organization?.lastName || "",
      email: organization?.email || "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    onSubmit: async (values) => {
      let response;

      try {
        // Attempt to update the organization
        response = await mutation.mutateAsync(values);
      } catch (error) {
        // If the error is a request error
        if (error instanceof AxiosError) {
          // Extract the error message
          const errorMessage = error.response?.data?.error as APIError;

          // If there is a field that the error applies to
          // and the form has that field
          if (
            errorMessage.field &&
            form.values.hasOwnProperty(errorMessage.field)
          ) {
            // Set the field error
            form.setFieldError(errorMessage.field, errorMessage.humanMessage);
          } else {
            // Else show the error as a toast message
            Toast.show({
              type: "error",
              text1: "Error",
              text2: errorMessage.humanMessage,
            });
          }
        }
      }

      // If there was an error, there is no response
      // This is to prevent the code below from running
      if (!response) return;

      // Get the updated organization from the response
      let updatedOrganization = response?.data.data.organization;

      // Update the organization in the auth context
      if (updatedOrganization) {
        updateOrganization(updatedOrganization);
      }

      // Clear the password fields
      form.setFieldValue("currentPassword", "");
      form.setFieldValue("newPassword", "");
      form.setFieldValue("confirmNewPassword", "");

      // Show a success message
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Organization updated successfully",
      });
    },
  });

  const validateFields = (fields: (keyof UpdateOrganizationInput)[]) => {
    // Get the errors from the validator
    // This will return ALL errors, even ones from different steps
    const errors = validators.validateSettings(form.values) as any;

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
    errors: form.errors,
    isLoading: mutation.isLoading || form.isSubmitting,

    validateFields,

    ...form.values,

    setFirstName: (firstName: string) => {
      form.setFieldValue("firstName", firstName);
    },
    setLastName: (lastName: string) => {
      form.setFieldValue("lastName", lastName);
    },
    setEmail: (email: string) => {
      form.setFieldValue("email", email);
    },
    setNewPassword: (password: string) => {
      form.setFieldValue("newPassword", password);
    },
    setConfirmNewPassword: (password: string) => {
      form.setFieldValue("confirmNewPassword", password);
    },
    setCurrentPassword: (password: string) => {
      form.setFieldValue("currentPassword", password);
    },
    handleSubmission: () => {
      form.handleSubmit();
    },
  };
};

export default useSettings;
