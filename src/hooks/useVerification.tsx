/*
 * Created on Sat Aug 12 2023
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

import authAPI from "@/api/auth";
import errors from "@/lib/errors";
import validate from "@/lib/validation";
import Content from "@/constants/content";
import { useAuth } from "@/providers/Auth";
import validators from "@/lib/validation/validators";

const useVerification = () => {
  const { accessToken, updateChapter } = useAuth();

  const verifyChapterMutation = useMutation({
    mutationFn: (input: VerifyChapterInput) => {
      return authAPI.verifyChapter({
        ...input,
        accessToken: accessToken || "",
      });
    },
  });

  const resendVerificationEmailMutation = useMutation({
    mutationFn: () => {
      return authAPI.resendVerification({
        accessToken: accessToken || "",
      });
    },
  });

  const form = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: async (values: VerifyChapterInput) => {
      onSubmit(values);
    },
  });

  // The function to run when the form is submitted
  const onSubmit = async (values: typeof form.values) => {
    // The response from the server
    let response;

    try {
      // Attempt to update the chapter
      response = await verifyChapterMutation.mutateAsync(values);
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

    // Reset the form
    form.resetForm();

    // Show a success message
    Toast.show({
      type: "success",
      text1: Content.verificationSuccess.verifyChapter.title,
      text2: Content.verificationSuccess.verifyChapter.message,
    });
  };

  // The function to run when the "Resend" button is pressed
  const resendVerificationEmail = async () => {
    // The response from the server
    let response;

    try {
      // Attempt to resend the verification email
      response = await resendVerificationEmailMutation.mutateAsync();
    } catch (error) {
      errors.handleApiError(error, form);
    }
    // If there was an error, prevent the "success" code from running
    if (!response) return;

    // Show a success message
    Toast.show({
      type: "success",
      text1: Content.verificationSuccess.resendVerificationEmail.title,
      text2: Content.verificationSuccess.resendVerificationEmail.message,
    });
  };

  // The validation function, takes certain fields so we dont update all errors at once
  const validateFields = (fields: (keyof typeof form.values)[]) => {
    return validate({
      form,
      fields,
      values: form.values,
      validatorFn: validators.validateVerifyChapter,
    });
  };

  return {
    isLoading:
      verifyChapterMutation.isLoading ||
      resendVerificationEmailMutation.isLoading,
    errors: form.errors,
    code: form.values.code,
    validateFields,
    setCode: (code: string) => form.setFieldValue("code", code),
    handleSubmission: () => form.handleSubmit(),
    resendVerificationEmail: () => resendVerificationEmail(),
  };
};

export default useVerification;
