/*
 * Created on Tue Oct 17 2023
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
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";

import pnmApi from "@/api/api/pnms";
import validators from "@/lib/validators";

export interface UseCreatePnm {
  isLoading: boolean;
  errors: Record<string, string>;

  firstName: string;
  lastName: string;
  phoneNumber: string;
  classification: string;
  instagram?: string;
  snapchat?: string;

  handleSubmission: () => void;
  validateFields: (fields: (keyof CreatePnmInput)[]) => boolean;

  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setClassification: (classification: string) => void;
  setInstagram: (instagram: string) => void;
  setSnapchat: (snapchat: string) => void;
}

const useCreatePnm = (): UseCreatePnm => {
  const mutation = useMutation({
    mutationFn: (input: CreatePnmInput) => {
      return pnmApi.createPnm(input);
    },
  });

  const form = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      classification: "",
      instagram: "",
      snapchat: "",
    },
    onSubmit: async (values) => {
      let response;

      try {
        // Try to add the pnm
        response = await mutation.mutateAsync(values);
      } catch (error) {
        // If the error is an axios error
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
          }
        }
      }

      // If there was an error, there is no response
      // This is to prevent the code below from running
      if (!response) return;

      // Clear all of the fields and errors
      form.resetForm();

      // Show a success toast
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Added a PNM successfully",
      });
    },
  });

  const validateFields = (fields: (keyof CreatePnmInput)[]) => {
    // Get the errors from the validator
    // This will return ALL errors, even ones from different steps
    const errors = validators.validateCreatePnm(form.values) as any;

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
    setPhoneNumber: (phoneNumber: string) => {
      form.setFieldValue("phoneNumber", phoneNumber);
    },
    setClassification: (classification: string) => {
      form.setFieldValue("classification", classification);
    },
    setInstagram: (instagram: string) => {
      form.setFieldValue("instagram", instagram);
    },
    setSnapchat: (snapchat: string) => {
      form.setFieldValue("snapchat", snapchat);
    },
    handleSubmission: () => {
      form.handleSubmit();
    },
  };
};

export default useCreatePnm;
