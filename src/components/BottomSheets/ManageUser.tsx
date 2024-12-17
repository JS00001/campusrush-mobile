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

import type { BottomSheetProps, SheetData } from "./@types";

import {
  useCreateChapterUser,
  useDeleteChapterUser,
  useUpdateChapterUser,
} from "@/hooks/api/chapter";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import Select from "@/ui/Select";
import Headline from "@/ui/Headline";
import FormField from "@/ui/FormField";
import { ChapterRole } from "@/@types";
import StatusBadge from "@/ui/StatusBadge";
import { useUser } from "@/providers/User";
import ButtonGroup from "@/ui/ButtonGroup";
import { BottomSheet } from "@/ui/BottomSheet";
import validators from "@/constants/validators";
import { ISelectOption } from "@/ui/Select/@types";
import useFormMutation from "@/hooks/useFormMutation";
import BottomSheetContainer from "@/ui/BottomSheet/Container";
import useKeyboardListener from "@/hooks/useKeyboardListener";

type Props = BottomSheetProps & SheetData<"MANAGE_USER">;

const Content: React.FC<Props> = ({
  data,
  close,
  snapToIndex,
  snapToPosition,
}) => {
  const user = data?.user;
  const isEditing = !!user;

  const createUserMutation = useCreateChapterUser();
  const updateUserMutation = useUpdateChapterUser();
  const deleteUserMutation = useDeleteChapterUser();
  const { user: currentUser, hasPermission } = useUser();

  const createFormValidators = {
    email: validators.email,
    role: z.enum(
      Object.values(ChapterRole) as [ChapterRole, ...ChapterRole[]],
      { required_error: "Required" },
    ),
  };

  const updateFormValidators = {
    id: validators.objectId,
    email: validators.email,
    role: z.enum(
      Object.values(ChapterRole) as [ChapterRole, ...ChapterRole[]],
      { required_error: "Required" },
    ),
  };

  const creationForm = useFormMutation({
    mutation: createUserMutation,
    validators: createFormValidators,
    initialValues: {
      email: "",
      role: ChapterRole.Viewer,
    },
    onSuccess: async () => {
      creationForm.clear();
      close();
      Toast.show({
        type: "success",
        text1: "Invitation sent",
        text2: "An invitation has been sent to the user's email",
      });
    },
  });

  const updateForm = useFormMutation({
    mutation: updateUserMutation,
    validators: updateFormValidators,
    initialValues: {
      id: user?._id,
      email: user?.email,
      role: user?.chapterRole,
    },
    onSuccess: async () => {
      close();
      Toast.show({
        type: "success",
        text1: "User updated",
        text2: "The user's role has been updated",
      });
    },
  });

  const form = isEditing ? updateForm : creationForm;

  useKeyboardListener({
    onKeyboardWillShow: () => snapToPosition("80%"),
    onKeyboardWillHide: () => snapToIndex(0),
  });

  const onClose = () => {
    form.clear();
    close();
  };

  const selectOptions: ISelectOption[] = [
    {
      label: "Owner",
      value: ChapterRole.Owner,
      disabled: !hasPermission(ChapterRole.Owner),
    },
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

  const buttonCta = isEditing ? "Update User" : "Send Invite";
  const headlineTitle = isEditing ? "Edit User" : "New User";
  const headlineSubtitle = isEditing
    ? "Edit a user's role in recruitment"
    : "Invite a user to assist with recruitment";

  // Show the user an appropriate warning based on actions they can't take
  const bannerText = (() => {
    if (!isEditing) return null;

    if (user.chapterRole === ChapterRole.Owner) {
      return "You cannot edit the owner of the chapter";
    }

    if (user._id === currentUser._id) {
      return "You cannot edit yourself";
    }

    return null;
  })();

  // Disable editing the role if certain conditions are met
  const disableRoleChange = (() => {
    if (!isEditing) return false;

    const isUserOwner = user.chapterRole === ChapterRole.Owner;
    const isUserSelf = user._id === currentUser._id;

    return isUserOwner || isUserSelf;
  })();

  return (
    <BottomSheetContainer>
      <Headline title={headlineTitle} subtitle={headlineSubtitle} />

      {bannerText && (
        <StatusBadge icon="Info" color="warning" style={tw`w-full`}>
          {bannerText}
        </StatusBadge>
      )}

      <FormField
        disabled={isEditing}
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
        disabled={disableRoleChange}
        onChange={(value) => form.setValue("role", value)}
      />

      <ButtonGroup>
        <Button color="secondary" disabled={form.loading} onPress={onClose}>
          Cancel
        </Button>
        <Button
          color="primary"
          loading={form.loading}
          disabled={disableRoleChange}
          onPress={form.handleSubmission}
        >
          {buttonCta}
        </Button>
      </ButtonGroup>
    </BottomSheetContainer>
  );
};

const ManageUserSheet: React.FC<BottomSheetProps> = (props) => {
  return (
    <BottomSheet
      innerRef={props.innerRef}
      children={(data?: SheetData<"MANAGE_USER">) => {
        return <Content data={data!.data} {...props} />;
      }}
    />
  );
};

export default ManageUserSheet;
