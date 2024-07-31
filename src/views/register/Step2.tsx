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

import { useNavigation } from "@react-navigation/native";

import Button from "@/ui/Button";
import FormField from "@/ui/FormField";
import usePosthog from "@/hooks/usePosthog";
import { useRegistrationStore } from "@/store";
import validators from "@/constants/validators";
import { useCheckEmail } from "@/hooks/api/auth";
import { AuthStackHook } from "@/navigation/@types";
import useFormMutation from "@/hooks/useFormMutation";
import TermsAndConditions from "@/components/TermsAndConditions";

const RegistrationStep2 = () => {
  const posthog = usePosthog();
  const mutation = useCheckEmail();
  const store = useRegistrationStore();
  const navigation = useNavigation<AuthStackHook>();

  const formValidators = {
    email: validators.email,
    firstName: validators.firstName,
    lastName: validators.lastName,
  };

  const form = useFormMutation({
    mutation,
    validators: formValidators,
    initialValues: {
      email: store.email,
      firstName: store.firstName,
      lastName: store.lastName,
    },
    onSuccess: async ({ data }) => {
      if (data.exists) {
        form.setError("email", "Email already exists");
        return;
      }

      store.setField("email", form.state.email.value);
      store.setField("firstName", form.state.firstName.value);
      store.setField("lastName", form.state.lastName.value);

      posthog.capture("REGISTRATION_STEP_2_COMPLETED", {
        chapter_name: store.name,
        chapter_email: form.state.email.value,
        chapter_first_name: form.state.firstName.value,
        chapter_last_name: form.state.lastName.value,
      });

      navigation.navigate("RegistrationStep3");
    },
  });

  return (
    <>
      <FormField
        placeholder="Email"
        value={form.state.email.value}
        error={form.state.email.error}
        onChangeText={form.setValue.bind(null, "email")}
      />
      <FormField
        placeholder="First Name"
        value={form.state.firstName.value}
        error={form.state.firstName.error}
        onChangeText={form.setValue.bind(null, "firstName")}
      />

      <FormField
        placeholder="Last Name"
        value={form.state.lastName.value}
        error={form.state.lastName.error}
        onChangeText={form.setValue.bind(null, "lastName")}
      />

      <Button
        loading={form.loading}
        onPress={form.handleSubmission}
        iconRight="arrow-right-line"
      >
        Continue
      </Button>

      <TermsAndConditions />
    </>
  );
};

export default RegistrationStep2;
