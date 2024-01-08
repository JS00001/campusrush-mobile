/*
 * Created on Sat Jan 06 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";

import errors from "@/lib/errors";
import validate from "@/lib/validation";
import eventsApi from "@/api/api/events";
import useEventsStore from "@/state/events";
import validators from "@/lib/validation/validators";

const useUpdateEvent = (eventId: string) => {
  const event = useEventsStore((state) => state.getEvent(eventId));
  const updateEvent = useEventsStore((state) => state.updateEvent);

  const mutation = useMutation({
    mutationFn: (input: UpdateEventInput) => {
      return eventsApi.updateEvent(input);
    },
  });

  const form = useFormik({
    initialValues: {
      id: eventId,
      title: event.title,
      description: event.description,
      location: event.location,
      startDate: new Date(event.startDate).getTime().toString(),
      endDate: new Date(event.endDate).getTime().toString(),
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: validators.validateCreateEvent,
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  const onSubmit = async (values: typeof form.values) => {
    let response;

    try {
      response = await mutation.mutateAsync(values);
    } catch (error) {
      errors.handleApiError(error, form);
    }

    if (!response) return;

    updateEvent(response.data.data.event);
  };

  // The validation function, takes certain fields so we dont update all errors at once
  const validateFields = (fields?: (keyof typeof form.values)[]) => {
    return validate({
      form,
      fields,
      values: form.values,
      validatorFn: validators.validateCreateEvent,
    });
  };

  const handleSubmission = async () => {
    // Check if form has been modified, dont submit if not
    if (!form.dirty) return;

    await form.submitForm();
  };

  const setField = (field: keyof typeof form.values, value: string) => {
    form.setFieldValue(field, value);
  };

  return {
    ...form.values,
    loading: mutation.isLoading,
    errors: form.errors,

    setField,
    validateFields,
    handleSubmission,
  };
};

export default useUpdateEvent;
