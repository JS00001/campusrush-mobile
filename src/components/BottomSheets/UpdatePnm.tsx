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
import Layout from "@/ui/Layout";
import { usePnm } from "@/store";
import TextInput from "@/ui/TextInput";
import { FormSheet } from "@/ui/BottomSheet";
import { useUpdatePnm } from "@/hooks/api/pnms";
import validators from "@/constants/validators";
import FormHeader from "@/components/Headers/Form";
import useFormMutation from "@/hooks/useFormMutation";

const UpdatePnmSheet: React.FC<BottomSheetProps> = ({
  innerRef,
  handleClose,
}) => {
  return (
    <FormSheet
      innerRef={innerRef}
      children={(data) => {
        const pnmId = data?.data.pnmId as string;

        const store = usePnm(pnmId);
        const updateMutation = useUpdatePnm();

        const formValidators = {
          id: validators.objectId,
          firstName: validators.firstName.optional(),
          lastName: validators.lastName.optional(),
          phoneNumber: validators.phoneNumber.optional(),
          classification: validators.shortContentString.optional(),
          instagram: validators.shortContentString.optional(),
          snapchat: validators.shortContentString.optional(),
        };

        const form = useFormMutation({
          mutation: updateMutation,
          validators: formValidators,
          onSuccess: async ({ data }) => {
            store.updatePnm(data.pnm);
            store.refetch();
            handleClose();
          },
          initialValues: {
            id: pnmId,
            firstName: store.pnm?.firstName,
            lastName: store.pnm?.lastName,
            phoneNumber: store.pnm?.phoneNumber,
            classification: store.pnm?.classification,
            instagram: store.pnm?.instagram,
            snapchat: store.pnm?.snapchat,
          },
        });

        // TODO: Add proper loading state
        if (!store.pnm) {
          return <Text>Loading...</Text>;
        }

        return (
          <Layout
            scrollable
            contentContainerStyle={tw`pt-0 items-start`}
            gap={12}
          >
            <FormHeader onSave={form.handleSubmission} onCancel={handleClose} />

            <Text variant="header" style={tw`text-primary`}>
              Edit PNM
            </Text>

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
            <TextInput
              placeholder="Phone Number"
              value={form.state.phoneNumber.value}
              error={form.state.phoneNumber.error}
              onChangeText={form.setValue.bind(null, "phoneNumber")}
            />
            <TextInput
              placeholder="Classification"
              value={form.state.classification.value}
              error={form.state.classification.error}
              onChangeText={form.setValue.bind(null, "classification")}
            />
            <TextInput
              placeholder="Instagram"
              value={form.state.instagram.value}
              error={form.state.instagram.error}
              onChangeText={form.setValue.bind(null, "instagram")}
            />
            <TextInput
              placeholder="Snapchat"
              value={form.state.snapchat.value}
              error={form.state.snapchat.error}
              onChangeText={form.setValue.bind(null, "snapchat")}
            />
          </Layout>
        );
      }}
    />
  );
};

export default UpdatePnmSheet;
