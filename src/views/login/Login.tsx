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
import TextInput from "@/ui/TextInput";
import { useAuth } from "@/providers/Auth";
import { useLogin } from "@/hooks/api/auth";
import validators from "@/constants/validators";
import useApiCall from "@/hooks/useFormMutation";
import TermsAndConditions from "@/components/TermsAndConditions";

const Login = () => {
  const mutation = useLogin();
  const { signIn } = useAuth();

  const formValidators = {
    email: validators.email,
    password: validators.password,
  };

  const form = useApiCall({
    mutation,
    validators: formValidators,
    onSuccess: (data) => signIn(data),
  });

  return (
    <>
      <TextInput
        placeholder="Email"
        error={form.state.email.error}
        value={form.state.email.value}
        onChangeText={form.setValue.bind(null, "email")}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        error={form.state.password.error}
        value={form.state.password.value}
        onChangeText={form.setValue.bind(null, "password")}
      />
      <Button
        loading={form.loading}
        iconRight="ri-arrow-right-line"
        onPress={form.handleSubmission}
      >
        Continue
      </Button>

      <TermsAndConditions />
    </>
  );
};

export default Login;
