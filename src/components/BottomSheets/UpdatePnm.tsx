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

import type { BottomSheetProps } from "./@types";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import { Layout } from "@/ui/Layout";
import FormField from "@/ui/FormField";
import { FormSheet } from "@/ui/BottomSheet";
import validators from "@/constants/validators";
import FormHeader from "@/components/Headers/Form";
import useFormMutation from "@/hooks/useFormMutation";
import { usePnmStore, useStatusStore } from "@/store";
import { useGetPnm, useUpdatePnm } from "@/hooks/api/pnms";

const UpdatePnmSheet: React.FC<BottomSheetProps> = ({
  innerRef,
  handleClose,
}) => {
  return (
    <FormSheet
      innerRef={innerRef}
      children={(data) => {
        const pnmId = data?.data.pnmId as string;

        const pnmStore = usePnmStore();
        const pnmQuery = useGetPnm(pnmId);
        const updatePnmMutation = useUpdatePnm();
        const setStatus = useStatusStore((s) => s.setStatus);

        const formValidators = {
          id: validators.objectId,
          firstName: validators.firstName.optional(),
          lastName: validators.lastName.optional(),
          phoneNumber: validators.phoneNumber.optional(),
          instagram: validators.shortContentString.optional(),
          snapchat: validators.shortContentString.optional(),
        };

        const form = useFormMutation({
          mutation: updatePnmMutation,
          validators: formValidators,
          onSuccess: async ({ data }) => {
            pnmStore.addOrUpdatePnm(data.pnm);
            pnmQuery.refetch();
            handleClose();
          },
          initialValues: {
            id: pnmId,
            firstName: pnmQuery.pnm?.firstName,
            lastName: pnmQuery.pnm?.lastName,
            phoneNumber: pnmQuery.pnm?.phoneNumber,
            instagram: pnmQuery.pnm?.instagram,
            snapchat: pnmQuery.pnm?.snapchat,
          },
        });

        const handleSubmission = async () => {
          setStatus("loading");
          await form.handleSubmission();
          setStatus("idle");
        };

        return (
          <Layout.Root>
            <Layout.Content
              scrollable
              contentContainerStyle={tw`pt-0 items-start`}
              gap={12}
            >
              <FormHeader onSave={handleSubmission} onCancel={handleClose} />

              <Text type="h1" style={tw`text-primary`}>
                Edit PNM
              </Text>

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
            </Layout.Content>
          </Layout.Root>
        );
      }}
    />
  );
};

export default UpdatePnmSheet;
