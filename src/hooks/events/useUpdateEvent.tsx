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
import eventsApi from "@/api/api/events";
import useEventsStore from "@/state/events";
import validators from "@/lib/validation/validators";

export interface UseUpdateEvent extends UpdateEventInput {
  loading: boolean;
  errors: Record<string, string>;

  handleSubmission: () => void;
  setField: (field: keyof UpdateEventInput, value: string) => void;
}

const useUpdateEvent = (eventId: string): UseUpdateEvent => {
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

  return {
    ...form.values,
    loading: mutation.isLoading,
    errors: form.errors,

    setField: (field, value) => {
      form.setFieldValue(field, value);
    },
    handleSubmission: async () => {
      await form.submitForm();
    },
  };
};

export default useUpdateEvent;
