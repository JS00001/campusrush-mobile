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
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";

import errors from "@/lib/errors";
import pnmApi from "@/api/api/pnms";
import useZustandStore from "@/state";
import validate from "@/lib/validation";
import Content from "@/constants/content";
import validators from "@/lib/validation/validators";

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
  const { addPnm } = useZustandStore();

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
      await onSubmit(values);
    },
  });

  // The function to run when the form is submitted
  const onSubmit = async (values: typeof form.values) => {
    // The response from the server
    let response;

    try {
      // Attempt to update the chapter
      response = await mutation.mutateAsync(values);
    } catch (error) {
      form.resetForm();
      errors.handleApiError(error, form);
    }
    // If there was an error, prevent the "success" code from running
    if (!response) return;

    // Add the pnm to the store
    addPnm(response.data.data.pnm);

    // Clear all of the fields and errors
    form.resetForm();

    // Show a success toast
    Toast.show({
      type: "success",
      text1: Content.createPNMSuccess.title,
      text2: Content.createPNMSuccess.message,
    });
  };

  // The validation function, takes certain fields so we dont update all errors at once
  const validateFields = (fields: (keyof typeof form.values)[]) => {
    return validate({
      form,
      fields,
      values: form.values,
      validatorFn: validators.validateCreatePnm,
    });
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
    handleSubmission: async () => {
      await form.submitForm();
    },
  };
};

export default useCreatePnm;
