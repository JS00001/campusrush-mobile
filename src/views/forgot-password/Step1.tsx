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

import { useNavigation } from "@react-navigation/native";

import Button from "@/ui/Button";
import FormField from "@/ui/FormField";
import validators from "@/constants/validators";
import { useForgotPasswordStore } from "@/store";
import { useResetPassword } from "@/hooks/api/auth";
import useFormMutation from "@/hooks/useFormMutation";
import type { AuthStackHook } from "@/navigation/@types";

const ForgotPasswordStep1View = () => {
  const mutation = useResetPassword();
  const store = useForgotPasswordStore();
  const navigation = useNavigation<AuthStackHook>();

  const formValidators = {
    email: validators.email,
  };

  const form = useFormMutation({
    mutation,
    validators: formValidators,
    initialValues: {
      email: store.email,
    },
    onSuccess: async () => {
      store.setField("email", form.state.email.value);
      navigation.navigate("ForgotPasswordStep2");
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

      <Button
        loading={form.loading}
        iconRight="ArrowRight"
        onPress={form.handleSubmission}
      >
        Reset Password
      </Button>
    </>
  );
};

export default ForgotPasswordStep1View;
