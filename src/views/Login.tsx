/*
 * Created on Fri Feb 23 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import Button from "@/ui/Button";
import FormField from "@/ui/FormField";
import { useAuth } from "@/providers/Auth";
import { useLogin } from "@/hooks/api/auth";
import validators from "@/constants/validators";
import useFormMutation from "@/hooks/useFormMutation";
import TermsAndConditions from "@/components/TermsAndConditions";

const LoginView = () => {
  const mutation = useLogin();
  const { authenticateUser } = useAuth();

  const formValidators = {
    email: validators.email,
    password: validators.password,
  };

  const form = useFormMutation({
    mutation,
    validators: formValidators,
    onSuccess: async (data) => {
      const userData = {
        chapter: data.data.chapter,
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
      };

      await authenticateUser(userData);
    },
  });

  return (
    <>
      <FormField
        placeholder="Email"
        error={form.state.email.error}
        value={form.state.email.value}
        onChangeText={form.setValue.bind(null, "email")}
      />
      <FormField
        secureTextEntry
        placeholder="Password"
        error={form.state.password.error}
        value={form.state.password.value}
        onChangeText={form.setValue.bind(null, "password")}
      />
      <Button
        loading={form.loading}
        iconRight="arrow-right-line"
        onPress={form.handleSubmission}
      >
        Continue
      </Button>

      <TermsAndConditions />
    </>
  );
};

export default LoginView;
