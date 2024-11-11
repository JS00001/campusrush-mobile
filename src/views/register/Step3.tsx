/*
 * Created on Sat Feb 24 2024
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
import { useRegistrationStore } from "@/store";
import { useRegister } from "@/hooks/api/auth";
import validators from "@/constants/validators";
import useFormMutation from "@/hooks/useFormMutation";
import TermsAndConditions from "@/components/TermsAndConditions";

const RegistrationStep3View = () => {
  const mutation = useRegister();
  const store = useRegistrationStore();

  const formValidators = {
    name: z.any(),
    school: z.any(),
    email: z.any(),
    firstName: z.any(),
    lastName: z.any(),
    password: validators.password,
    confirmPassword: validators.password,
  };

  const form = useFormMutation({
    mutation,
    validators: formValidators,
    initialValues: {
      name: store.name,
      school: store.school,
      email: store.email,
      firstName: store.firstName,
      lastName: store.lastName,
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

      <Button
        loading={form.loading}
        onPress={onSubmit}
        iconRight="arrow-right-line"
      >
        Complete Registration
      </Button>

      <TermsAndConditions />
    </>
  );
};

export default RegistrationStep3View;
