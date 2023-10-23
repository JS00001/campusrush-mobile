/*
 * Created on Mon Oct 23 2023
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
import pnmsApi from "@/api/api/pnms";
import usePnmsStore from "@/state/pnms";
import validators from "@/lib/validators";
import { useNavigation } from "@react-navigation/native";

const useUpdatePnm = (pnmId: string, field: string) => {
  // Get the navigation from the stack
  const navigation = useNavigation();
  // Get the PNM from the store
  const pnm = usePnmsStore((state) => state.getPnm(pnmId));
  // Get the method to update the PNM from the store
  const updatePnm = usePnmsStore((state) => state.updatePnm);

  // The mutation to store data server side
  const mutation = useMutation({
    mutationFn: (input: UpdatePnmInput) => {
      return pnmsApi.updatePnm(input);
    },
  });

  // The form to store TextInput data and its submission function
  const form = useFormik({
    initialValues: {
      value: "",
    },
    onSubmit: async (values) => {
      onSubmit(values);
    },
  });

  // The function to run when the form is submitted
  const onSubmit = async (values: typeof form.values) => {
    // The response from the server
    let response;

    // The value from the form that is being submitted
    const value = values.value;

    // Whether or not the input is valid
    const hasValidationErrors = validate();

    // If there are validation errors, return
    if (!hasValidationErrors) return;

    try {
      // Attempt to update the organization
      response = await mutation.mutateAsync({
        id: pnmId,
        [field]: value,
      });
    } catch (error) {
      // If there was an error, handle it
      errors.handleApiError(error, form);
    }

    // If there was an error, prevent the "success" code from running
    if (!response) return;

    // Clear the form
    form.resetForm();

    // Update the pnm in the store
    updatePnm({
      ...pnm,
      [field]: value,
    });

    // Show a success message
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "PNM updated successfully",
    });

    // Navigate back to the details screen
    navigation.goBack();
  };

  // The validation function, does not need arguments
  const validate = () => {
    // Validate the input and return ALL fields with errors
    const errors = validators.validateSettings({
      [field]: form.values.value,
    }) as any;

    // Remove any items in the object that arent the field we are validating
    // This prevents other errors from showing up since we arent updating them
    Object.keys(errors).forEach((key) => {
      if (key != field) {
        delete (errors as any)[key];
      }
    });

    // If the field has an error, set the field error
    form.setFieldError("value", errors[field]);

    // Check whether there are any errors still in the object
    const hasErrors = !Object.values(errors).some((error) => error !== "");

    // Return whether there are errors
    return hasErrors;
  };

  return {
    ...mutation,

    pnm,
    errors: form.errors,
    value: form.values.value,

    handleSubmission: () => form.handleSubmit(),
    setValue: (value: string) => form.setFieldValue("value", value),
  };
};

export default useUpdatePnm;
