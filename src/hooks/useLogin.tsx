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
import { useMutation } from "@tanstack/react-query";

import authAPI from "@/api/auth";

const useOrganizationCreation = () => {
  const mutation = useMutation({
    mutationFn: (values: LoginAsOrganizationInput) => {
      return authAPI.loginAsOrganization(values);
    },
  });

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      mutation.mutate(values, {
        onSuccess: ({ data }) => {
          const accessToken = data?.data.accessToken;
          const refreshToken = data?.data.refreshToken;
        },
        onError: () => {},
      });
    },
  });

  return {
    ...mutation,
    email: form.values.email,
    password: form.values.password,
    handleSubmission: () => form.handleSubmit(),
    setEmail: form.setFieldValue.bind(null, "email"),
    setPassword: form.setFieldValue.bind(null, "password"),
  };
};

export default useOrganizationCreation;
