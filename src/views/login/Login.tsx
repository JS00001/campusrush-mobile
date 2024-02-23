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

  const { state, loading, setValue, handleSubmission } = useApiCall({
    mutation,
    validators: formValidators,
    onSuccess: (data) => signIn(data),
  });

  return (
    <>
      <TextInput
        placeholder="Email"
        error={state.email.error}
        value={state.email.value}
        onChangeText={(value) => setValue("email", value)}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        error={state.password.error}
        value={state.password.value}
        onChangeText={(value) => setValue("password", value)}
      />
      <Button
        loading={loading}
        iconRight="ri-arrow-right-line"
        onPress={handleSubmission}
      >
        Continue
      </Button>

      <TermsAndConditions />
    </>
  );
};

export default Login;
