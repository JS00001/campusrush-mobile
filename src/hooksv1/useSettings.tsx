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
import chapterApi from "@/apiv1/api/chapter";
import validators from "@/lib/validation/validators";

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
    let response;

    // Remove all empty fields from the values, prevents empty strings from being sent to the server
    values = Object.fromEntries(
      Object.entries(values).filter(([_, value]) => value !== ""),
    ) as typeof form.values;

    try {
      response = await mutation.mutateAsync(values);
    } catch (error) {
      errors.handleApiError(error, form);
    }

    if (!response) return;

    let updatedChapter = response?.data.data.chapter;

    if (updatedChapter) {
      updateChapter(updatedChapter);
    }

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
