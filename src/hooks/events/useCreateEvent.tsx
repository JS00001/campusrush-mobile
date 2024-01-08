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
import validate from "@/lib/validation";
import eventsApi from "@/api/api/events";
import Content from "@/constants/content";
import useEventsStore from "@/state/events";
import validators from "@/lib/validation/validators";

export interface UseCreateEvent extends CreateEventInput {
  isLoading: boolean;
  errors: Record<string, string>;

  handleSubmission: () => void;
  validateFields: (fields: (keyof CreateEventInput)[]) => boolean;
  setField: (field: keyof CreateEventInput, value: string) => void;
}

const useCreateEvent = (): UseCreateEvent => {
  const addEvent = useEventsStore((state) => state.addEvent);

  const mutation = useMutation({
    mutationFn: (input: CreateEventInput) => {
      return eventsApi.createEvent(input);
    },
  });

  const form = useFormik({
    initialValues: {
      title: "",
      description: "",
      location: "",
      startDate: new Date().getTime().toString(),
      endDate: new Date().getTime().toString(),
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
      // Attempt to update the organization
      response = await mutation.mutateAsync(values);
    } catch (error) {
      form.resetForm();
      errors.handleApiError(error, form);
    }
    // If there was an error, prevent the "success" code from running
    if (!response) return;

    // Add the event to the store
    addEvent(response.data.data.event);

    // Clear all of the fields and errors
    form.resetForm();

    // Show a success toast
    Toast.show({
      type: "success",
      text1: Content.createEventSuccess.title,
      text2: Content.createEventSuccess.message,
    });
  };

  // The validation function, takes certain fields so we dont update all errors at once
  const validateFields = (fields: (keyof typeof form.values)[]) => {
    return validate({
      form,
      fields,
      values: form.values,
      validatorFn: validators.validateCreateEvent,
    });
  };

  return {
    ...form.values,
    errors: form.errors,
    isLoading: mutation.isLoading || form.isSubmitting,

    validateFields,
    setField: (field, value) => {
      form.setFieldValue(field, value);
    },
    handleSubmission: async () => {
      await form.submitForm();
    },
  };
};

export default useCreateEvent;
