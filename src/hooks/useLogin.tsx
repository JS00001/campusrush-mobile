/*
 * Created on Fri Aug 11 2023
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

import { useAuth } from "@/providers/Auth";
import validators from "@/lib/validation/validators";

const useLogin = () => {
  const { signIn } = useAuth();

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validators.validateLogin,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values: LoginAsOrganizationInput) => {
      const error = await signIn(values);

      if (error) {
        // check if error has field property and if the field exists in the form
        if (error.field && form.values.hasOwnProperty(error.field)) {
          // set the error on the field
          form.setFieldError(error.field, error.humanMessage);
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error.humanMessage,
          });
        }
      }
    },
  });

  return {
    errors: form.errors,
    isLoading: form.isSubmitting,

    email: form.values.email,
    password: form.values.password,
    handleSubmission: () => {
      form.handleSubmit();
    },
    setEmail: (email: string) => form.setFieldValue("email", email),
    setPassword: (password: string) => form.setFieldValue("password", password),
  };
};

export default useLogin;
