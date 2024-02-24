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
import TextInput from "@/ui/TextInput";
import validators from "@/constants/validators";
import { useCheckEmail } from "@/hooks/api/auth";
import useFormMutation from "@/hooks/useFormMutation";
import useRegistrationStore from "@/state/registration";
import TermsAndConditions from "@/components/TermsAndConditions";

const RegistrationStep2 = () => {
  const mutation = useCheckEmail();
  const navigation = useNavigation();
  const { fields, setField } = useRegistrationStore();

  const formValidators = {
    email: validators.email,
    firstName: validators.firstName,
    lastName: validators.lastName,
  };

  const form = useFormMutation({
    mutation,
    validators: formValidators,
    initialValues: {
      email: fields.email,
      firstName: fields.firstName,
      lastName: fields.lastName,
    },
    onSuccess: async ({ data }) => {
      if (data.exists) {
        form.setError("email", "Email already exists");
        return;
      }

      setField("email", form.state.email.value);
      setField("firstName", form.state.firstName.value);
      setField("lastName", form.state.lastName.value);
      (navigation.navigate as any)("RegistrationStep3");
    },
  });

  return (
    <>
      <TextInput
        placeholder="Email"
        value={form.state.email.value}
        error={form.state.email.error}
        onChangeText={form.setValue.bind(null, "email")}
      />
      <TextInput
        placeholder="First Name"
        value={form.state.firstName.value}
        error={form.state.firstName.error}
        onChangeText={form.setValue.bind(null, "firstName")}
      />
      <TextInput
        placeholder="Last Name"
        value={form.state.lastName.value}
        error={form.state.lastName.error}
        onChangeText={form.setValue.bind(null, "lastName")}
      />

      <Button
        loading={form.loading}
        onPress={form.handleSubmission}
        iconRight="ri-arrow-right-line"
      >
        Continue
      </Button>

      <TermsAndConditions />
    </>
  );
};

export default RegistrationStep2;
