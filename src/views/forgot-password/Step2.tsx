/*
 * Created on Wed Aug 14 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { z } from "zod";

import Button from "@/ui/Button";
import FormField from "@/ui/FormField";
import validators from "@/constants/validators";
import { useForgotPasswordStore } from "@/store";
import { useChangePassword } from "@/hooks/api/auth";
import useFormMutation from "@/hooks/useFormMutation";

const ForgotPasswordStep2View = () => {
  const mutation = useChangePassword();
  const store = useForgotPasswordStore();

  const formValidators = {
    email: z.any(),
    code: z.string().max(6),
    password: validators.password,
    confirmPassword: validators.password,
  };

  const form = useFormMutation({
    mutation,
    validators: formValidators,
    initialValues: {
      email: store.email,
      code: store.code,
      password: store.password,
      confirmPassword: store.confirmPassword,
    },
    onSuccess: async () => {
      store.clear();
    },
  });

  const onSubmit = () => {
    const isValid = form.validateState();

    if (!isValid) return;

    if (form.state.password.value !== form.state.confirmPassword.value) {
      form.setError("password", "Passwords do not match");
      form.setError("confirmPassword", "Passwords do not match");
      return;
    }

    form.handleSubmission();
  };

  return (
    <>
      <FormField
        placeholder="Code"
        value={form.state.code.value}
        error={form.state.code.error}
        onChangeText={form.setValue.bind(null, "code")}
      />
      <FormField
        secureTextEntry
        placeholder="Password"
        value={form.state.password.value}
        error={form.state.password.error}
        onChangeText={form.setValue.bind(null, "password")}
      />
      <FormField
        secureTextEntry
        placeholder="Confirm Password"
        value={form.state.confirmPassword.value}
        error={form.state.confirmPassword.error}
        onChangeText={form.setValue.bind(null, "confirmPassword")}
      />

      <Button loading={form.loading} iconRight="ArrowRight" onPress={onSubmit}>
        Finish Changing Password
      </Button>
    </>
  );
};

export default ForgotPasswordStep2View;
