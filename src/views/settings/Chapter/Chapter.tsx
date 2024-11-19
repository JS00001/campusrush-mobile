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
import { useUser } from "@/providers/User";
import validators from "@/constants/validators";
import { useUpdateUser } from "@/hooks/api/user";
import useFormMutation from "@/hooks/useFormMutation";

const ChapterView = () => {
  const { user, chapter } = useUser();
  const updateMutation = useUpdateUser();

  const formValidators = {
    email: validators.email.optional(),
    firstName: validators.firstName.optional(),
    lastName: validators.lastName.optional(),
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
    },
    initialValues: {
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
    },
  });

  return (
    <>
      <FormField
        disabled
        placeholder="Chapter Name"
        value={chapter.name || "N/A"}
      />
      <FormField
        disabled
        placeholder="School"
        value={chapter.school || "N/A"}
      />

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
        onPress={form.handleSubmission}
        loading={updateMutation.isPending}
      >
        Save Changes
      </Button>
    </>
  );
};

export default ChapterView;
