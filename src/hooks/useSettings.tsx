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

import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";

import errors from "@/lib/errors";
import validate from "@/lib/validation";
import Content from "@/constants/content";
import { useAuth } from "@/providers/Auth";
import validators from "@/lib/validation/validators";
import chapterApi from "@/api/api/chapter";

const useSettings = () => {
  const { chapter, updateChapter } = useAuth();

  // Create the mutation for updating the chapter
  const mutation = useMutation({
    mutationFn: (input: UpdateChapterInput) => {
      return chapterApi.updateChapter(input);
    },
  });

  // The form to store TextInput data and its submission function
  const form = useFormik({
    initialValues: {
      firstName: chapter?.firstName || "",
      lastName: chapter?.lastName || "",
      email: chapter?.email || "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      linkSharingEnabled: chapter?.linkSharingEnabled || false,
    },
    onSubmit: async (values) => {
      onSubmit(values);
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
      errors.handleApiError(error, form);
    }
    // If there was an error, prevent the "success" code from running
    if (!response) return;

    // Get the updated chapter from the response
    let updatedChapter = response?.data.data.chapter;

    // Update the chapter in the auth context
    if (updatedChapter) {
      updateChapter(updatedChapter);
    }

    // Clear the password fields
    form.setFieldValue("currentPassword", "");
    form.setFieldValue("newPassword", "");
    form.setFieldValue("confirmNewPassword", "");

    // Show a success message
    Toast.show({
      type: "success",
      text1: Content.updateChapterSuccess.title,
      text2: Content.updateChapterSuccess.message,
    });
  };

  // The validation function, takes certain fields so we dont update all errors at once
  const validateFields = (fields: (keyof typeof form.values)[]) => {
    return validate({
      form,
      fields,
      values: form.values,
      validatorFn: validators.validateSettings,
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
    setLinkSharingEnabled: (linkSharingEnabled: boolean) => {
      form.setFieldValue("linkSharingEnabled", linkSharingEnabled);
      form.handleSubmit();
    },
    handleSubmission: () => {
      form.handleSubmit();
    },
  };
};

export default useSettings;
