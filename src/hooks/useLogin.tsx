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

import { useAuth } from "@/providers/Auth";

const useLogin = () => {
  const { signIn } = useAuth();

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values: LoginAsOrganizationInput) => {
      await signIn(values);
    },
  });

  return {
    isLoading: form.isSubmitting,
    email: form.values.email,
    password: form.values.password,
    handleSubmission: () => form.handleSubmit(),
    setEmail: (email: string) => form.setFieldValue("email", email),
    setPassword: (password: string) => form.setFieldValue("password", password),
  };
};

export default useLogin;
