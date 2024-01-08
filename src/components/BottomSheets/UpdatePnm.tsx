/*
 * Created on Wed Dec 20 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { ActivityIndicator } from "react-native";

import FormSheet from "./Components/FormSheet";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import TextInput from "@/ui/TextInput";
import StatusIcon from "@/ui/StatusIcon";
import FormHeader from "@/components/Headers/Form";
import useUpdatePnm from "@/hooks/pnms/useUpdatePnm";

interface UpdatePnmProps {
  innerRef: React.RefObject<any>;
  handleCloseModalPress: () => void;
}

const UpdatePnm: React.FC<UpdatePnmProps> = ({
  handleCloseModalPress,
  innerRef,
}) => {
  const onCancel = () => {
    handleCloseModalPress();
  };

  return (
    <FormSheet
      innerRef={innerRef}
      children={(data) => {
        const pnmId = data?.data.pnmId;
        const form = useUpdatePnm(pnmId);

        const onSave = async () => {
          const isValid = form.validateFields();

          if (!isValid) return;

          await form.handleSubmission();
          handleCloseModalPress();
        };

        return (
          <>
            {form.loading && (
              <StatusIcon>
                <StatusIcon.Icon>
                  <ActivityIndicator size="large" color="white" />
                </StatusIcon.Icon>
              </StatusIcon>
            )}

            <Layout
              scrollable
              contentContainerStyle={tw`pt-0 items-start`}
              gap={12}
            >
              <FormHeader onSave={onSave} onCancel={onCancel} />

              <Text variant="header" style={tw`text-primary`}>
                Edit PNM
              </Text>

              <TextInput
                placeholder="First Name"
                value={form.firstName}
                error={form.errors.firstName}
                onChangeText={(text) => form.setField("firstName", text)}
              />
              <TextInput
                placeholder="Last Name"
                value={form.lastName}
                error={form.errors.lastName}
                onChangeText={(text) => form.setField("lastName", text)}
              />
              <TextInput
                placeholder="Phone Number"
                value={form.phoneNumber}
                error={form.errors.phoneNumber}
                onChangeText={(text) => form.setField("phoneNumber", text)}
              />
              <TextInput
                placeholder="Classification"
                value={form.classification}
                error={form.errors.classification}
                onChangeText={(text) => form.setField("classification", text)}
              />
              <TextInput
                placeholder="Instagram"
                value={form.instagram}
                error={form.errors.instagram}
                onChangeText={(text) => form.setField("instagram", text)}
              />
              <TextInput
                placeholder="Snapchat"
                value={form.snapchat}
                error={form.errors.snapchat}
                onChangeText={(text) => form.setField("snapchat", text)}
              />
            </Layout>
          </>
        );
      }}
    ></FormSheet>
  );
};

export default UpdatePnm;
