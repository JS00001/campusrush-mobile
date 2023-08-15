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

import { useAuth } from "@/providers/Auth";

const useVerification = () => {
  const { resendVerificationEmail, verifyOrganization } = useAuth();

  const form = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: async (values: VerifyOrganizationInput) => {
      await verifyOrganization(values);
    },
  });

  return {
    isLoading: form.isSubmitting,
    code: form.values.code,
    setCode: form.setFieldValue.bind(null, "code"),
    handleSubmission: () => form.handleSubmit(),
    resendVerificationEmail: () => resendVerificationEmail(),
  };
};

export default useVerification;
