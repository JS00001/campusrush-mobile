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

import { z } from "zod";

import type { ActionMenu } from "@/types";
import type { BottomSheetProps, SheetData } from "./@types";

import tw from "@/lib/tailwind";
import Avatar from "@/ui/Avatar";
import { Layout } from "@/ui/Layout";
import FormField from "@/ui/FormField";
import { useStatusStore } from "@/store";
import useCamera from "@/hooks/useCamera";
import TagView from "@/components/TagView";
import { FormSheet } from "@/ui/BottomSheet";
import { useUpdatePnm } from "@/hooks/api/pnms";
import validators from "@/constants/validators";
import FormHeader from "@/components/Headers/Form";
import useFormMutation from "@/hooks/useFormMutation";
import useCloudStorage from "@/hooks/useCloudStorage";

const UpdatePnmSheet: React.FC<BottomSheetProps> = ({
  innerRef,
  openBottomSheet,
  handleClose,
}) => {
  return (
    <FormSheet
      innerRef={innerRef}
      children={(props?: SheetData<"UPDATE_PNM">) => {
        const { pnm } = props!.data;

        const camera = useCamera();
        const cloudStorage = useCloudStorage();
        const updatePnmMutation = useUpdatePnm();
        const setStatusOverlay = useStatusStore((s) => s.setStatusOverlay);

        const formValidators = {
          id: validators.objectId,
          firstName: validators.firstName.optional(),
          lastName: validators.lastName.optional(),
          phoneNumber: validators.phoneNumber.optional(),
          instagram: validators.shortContentString.optional(),
          snapchat: validators.shortContentString.optional(),
          avatar: validators.url.optional(),
          tags: z.array(z.string()).optional(),
        };

        const form = useFormMutation({
          mutation: updatePnmMutation,
          validators: formValidators,
          onSuccess: async () => {
            handleClose();
          },
          initialValues: {
            id: pnm._id,
            firstName: pnm.firstName,
            lastName: pnm.lastName,
            phoneNumber: pnm.phoneNumber,
            instagram: pnm.instagram,
            snapchat: pnm.snapchat,
            avatar: pnm.avatar,
            tags: pnm.tags || [],
          },
        });

        const onTagsPress = () => {
          openBottomSheet("TAG_SELECTOR", {
            values: form.state.tags.value,
            onTagChange: form.setValue.bind(null, "tags"),
          });
        };

        const handleSubmission = async () => {
          setStatusOverlay("loading");
          await form.handleSubmission();
          setStatusOverlay("idle");
        };

        const editAvatarMenu: ActionMenu = [
          {
            header: "Edit Avatar",
            menuItems: [
              {
                iconName: "Camera",
                label: "Take Photo",
                onPress: async () => {
                  const image = await camera.takePhoto();
                  if (!image) return;
                  const imageUrl = await cloudStorage.uploadImage(image);
                  if (!imageUrl) return;
                  form.setValue("avatar", imageUrl);
                },
              },
              {
                iconName: "Image",
                label: "Choose from Gallery",
                onPress: async () => {
                  const image = await camera.selectPhoto();
                  if (!image) return;
                  const imageUrl = await cloudStorage.uploadImage(image);
                  if (!imageUrl) return;
                  form.setValue("avatar", imageUrl);
                },
              },
            ],
          },
        ];

        const onEditPress = () => {
          openBottomSheet("ACTION_MENU", editAvatarMenu);
        };

        return (
          <Layout.Root>
            <Layout.Content
              scrollable
              gap={12}
              safeAreaPosition="top"
              contentContainerStyle={tw`pt-0 items-start`}
            >
              <FormHeader
                disableSave={form.loading || cloudStorage.isLoading}
                onCancel={handleClose}
                onSave={handleSubmission}
              />

              <Avatar
                editable
                size="lg"
                style={tw`self-center`}
                url={form.state.avatar.value}
                loading={cloudStorage.isLoading}
                onPress={onEditPress}
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
              <FormField
                placeholder="Phone Number"
                value={form.state.phoneNumber.value}
                error={form.state.phoneNumber.error}
                onChangeText={form.setValue.bind(null, "phoneNumber")}
              />
              <FormField
                placeholder="Instagram"
                value={form.state.instagram.value}
                error={form.state.instagram.error}
                onChangeText={form.setValue.bind(null, "instagram")}
              />
              <FormField
                placeholder="Snapchat"
                value={form.state.snapchat.value}
                error={form.state.snapchat.error}
                onChangeText={form.setValue.bind(null, "snapchat")}
              />
              <TagView tags={form.state.tags.value} onPress={onTagsPress} />
            </Layout.Content>
          </Layout.Root>
        );
      }}
    />
  );
};

export default UpdatePnmSheet;
