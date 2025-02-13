/*
 * Created on Sun Feb 25 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */
import Toast from "react-native-toast-message";

import Button from "@/ui/Button";
import FormField from "@/ui/FormField";
import validators from "@/constants/validators";
import { useUpdateUser } from "@/hooks/api/user";
import useFormMutation from "@/hooks/useFormMutation";

const ChangePasswordView = () => {
  const updateMutation = useUpdateUser();

  const formValidators = {
    currentPassword: validators.password,
    newPassword: validators.password,
    confirmNewPassword: validators.password,
  };

  const form = useFormMutation({
    mutation: updateMutation,
    validators: formValidators,
    onSuccess: async () => {
      Toast.show({
        type: "success",
        text1: "Updated Chapter",
        text2: "Your chapter has been updated",
      });

      form.clear();
    },
  });

  const onSubmit = () => {
    const isValid = form.validateState();

    if (!isValid) return;

    if (form.state.newPassword.value !== form.state.confirmNewPassword.value) {
      form.setError("newPassword", "Passwords do not match");
      form.setError("confirmNewPassword", "Passwords do not match");
      return;
    }

    form.handleSubmission();
  };

  return (
    <>
      <FormField
        secureTextEntry
        placeholder="Current Password"
        value={form.state.currentPassword.value}
        error={form.state.currentPassword.error}
        onChangeText={form.setValue.bind(null, "currentPassword")}
      />
      <FormField
        secureTextEntry
        placeholder="New Password"
        value={form.state.newPassword.value}
        error={form.state.newPassword.error}
        onChangeText={form.setValue.bind(null, "newPassword")}
      />
      <FormField
        secureTextEntry
        placeholder="Confirm New Password"
        value={form.state.confirmNewPassword.value}
        error={form.state.confirmNewPassword.error}
        onChangeText={form.setValue.bind(null, "confirmNewPassword")}
      />

      <Button onPress={onSubmit} loading={updateMutation.isPending}>
        Save Changes
      </Button>
    </>
  );
};

export default ChangePasswordView;
