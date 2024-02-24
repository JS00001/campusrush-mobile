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
import pnmsApi from "@/apiv1/api/pnms";
import validate from "@/lib/validation";
import validators from "@/lib/validation/validators";
import usePnmsStore from "@/statev1/pnms";

const useUpdatePnm = (pnmId: string) => {
  const pnm = usePnmsStore((state) => state.getPnm(pnmId));
  const updatePnm = usePnmsStore((state) => state.updatePnm);

  const mutation = useMutation({
    mutationFn: (input: UpdatePnmInput) => {
      return pnmsApi.updatePnm(input);
    },
  });

  const form = useFormik({
    initialValues: {
      id: pnm._id,
      firstName: pnm.firstName,
      lastName: pnm.lastName,
      phoneNumber: pnm.phoneNumber,
      classification: pnm.classification,
      instagram: pnm.instagram,
      snapchat: pnm.snapchat,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: validators.validateUpdatePnm,
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  const onSubmit = async (values: typeof form.values) => {
    let response;

    values = Object.fromEntries(
      Object.entries(values).filter(([_, value]) => value !== ""),
    ) as typeof form.values;

    try {
      response = await mutation.mutateAsync(values);
    } catch (error) {
      errors.handleApiError(error, form);
    }

    if (!response) return;

    updatePnm(response.data.data.pnm);
  };

  // The validation function, takes certain fields so we dont update all errors at once
  const validateFields = (fields?: (keyof typeof form.values)[]) => {
    return validate({
      form,
      fields,
      values: form.values,
      validatorFn: validators.validateUpdatePnm,
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

export default useUpdatePnm;
