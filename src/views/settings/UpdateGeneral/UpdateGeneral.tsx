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
import Content from "@/constants/content";
import { useAuth } from "@/providers/Auth";
import validators from "@/constants/validators";
import useFormMutation from "@/hooks/useFormMutation";
import { useUpdateChapter } from "@/hooks/api/chapter";

const UpdateGeneralView = () => {
  const { chapter, setChapter } = useAuth();
  const updateMutation = useUpdateChapter();

  const formValidators = {
    email: validators.email.optional(),
    firstName: validators.firstName.optional(),
    lastName: validators.lastName.optional(),
  };

  const form = useFormMutation({
    mutation: updateMutation,
    validators: formValidators,
    onSuccess: async ({ data }) => {
      setChapter(data.chapter);

      Toast.show({
        type: "success",
        text1: Content.updateChapterSuccess.title,
        text2: Content.updateChapterSuccess.message,
      });
    },
    initialValues: {
      email: chapter?.email,
      firstName: chapter?.firstName,
      lastName: chapter?.lastName,
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
        onPress={form.handleSubmission}
        loading={updateMutation.isLoading}
      >
        Save Changes
      </Button>
    </>
  );
};

export default UpdateGeneralView;
