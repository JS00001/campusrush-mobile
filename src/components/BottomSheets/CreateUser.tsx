/*
 * Created on Sun Sep 10 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { z } from "zod";
import Toast from "react-native-toast-message";

import type { BottomSheetProps } from "./@types";

import Button from "@/ui/Button";
import Select from "@/ui/Select";
import Headline from "@/ui/Headline";
import FormField from "@/ui/FormField";
import { ChapterRole } from "@/@types";
import { useUser } from "@/providers/User";
import ButtonGroup from "@/ui/ButtonGroup";
import { BottomSheet } from "@/ui/BottomSheet";
import validators from "@/constants/validators";
import { ISelectOption } from "@/ui/Select/@types";
import useFormMutation from "@/hooks/useFormMutation";
import { useCreateChapterUser } from "@/hooks/api/chapter";
import BottomSheetContainer from "@/ui/BottomSheet/Container";
import useKeyboardListener from "@/hooks/useKeyboardListener";

const CreateUserSheet: React.FC<BottomSheetProps> = ({
  close,
  innerRef,
  snapToIndex,
  snapToPosition,
}) => {
  const { hasPermission } = useUser();
  const mutation = useCreateChapterUser();

  const formValidators = {
    email: validators.email,
    role: z.enum(
      Object.values(ChapterRole) as [ChapterRole, ...ChapterRole[]],
      { required_error: "Required" },
    ),
  };

  const form = useFormMutation({
    mutation,
    validators: formValidators,
    initialValues: {
      email: "",
      role: ChapterRole.Viewer,
    },
    onSuccess: async () => {
      form.clear();
      close();

      Toast.show({
        type: "success",
        text1: "Invitation sent",
        text2: "An invitation has been sent to the user's email",
      });
    },
  });

  useKeyboardListener({
    onKeyboardWillShow: () => {
      snapToPosition("80%");
    },
    onKeyboardWillHide: () => {
      snapToIndex(0);
    },
  });

  const onClose = () => {
    form.clear();
    close();
  };

  const ownerSelectOptions: ISelectOption[] = [
    {
      label: "Owner",
      value: ChapterRole.Owner,
    },
  ];

  const selectOptions: ISelectOption[] = [
    ...(hasPermission(ChapterRole.Owner) ? ownerSelectOptions : []),
    {
      label: "Admin",
      value: ChapterRole.Admin,
    },
    {
      label: "Editor",
      value: ChapterRole.Editor,
    },
    {
      label: "Viewer",
      value: ChapterRole.Viewer,
    },
  ];

  return (
    <BottomSheet
      innerRef={innerRef}
      children={() => {
        return (
          <BottomSheetContainer>
            <Headline
              title="New User"
              subtitle="Invite a user to assist with recruitment"
            />

            <FormField
              placeholder="User Email"
              value={form.state.email.value}
              error={form.state.email.error}
              onChangeText={(value) => form.setValue("email", value)}
            />

            <Select
              options={selectOptions}
              placeholder="Role"
              error={form.state.role.error}
              value={form.state.role.value}
              onChange={(value) => form.setValue("role", value)}
            />

            <ButtonGroup>
              <Button
                color="secondary"
                onPress={onClose}
                disabled={form.loading}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                loading={form.loading}
                onPress={form.handleSubmission}
              >
                Send Invite
              </Button>
            </ButtonGroup>
          </BottomSheetContainer>
        );
      }}
    />
  );
};

export default CreateUserSheet;
