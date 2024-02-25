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

import { View } from "react-native";
import Toast from "react-native-toast-message";

import type { UseSheetFlowProps } from "@/hooks/useSheetFlow";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import ListItem from "@/ui/ListItem";
import Content from "@/constants/content";
import ButtonGroup from "@/ui/ButtonGroup";
import { useCreatePnm } from "@/hooks/api/pnms";

const ManualStep3: React.FC<UseSheetFlowProps> = ({
  state,
  setState,
  prevView,
  handleClose,
}) => {
  const fields = {
    firstName: "First Name",
    lastName: "Last Name",
    phoneNumber: "Phone Number",
    classification: "Classification",
    instagram: "Instagram",
    snapchat: "Snapchat",
  };

  const mutation = useCreatePnm();

  const handleSubmission = async () => {
    const res = await mutation.mutateAsync(state as CreatePnmRequest);

    if ("error" in res) {
      return;
    }

    // TODO: Add pnm via the global store (Updating the statistics, list of PNMs, etc.)
    setState({
      firstName: undefined,
      lastName: undefined,
      phoneNumber: undefined,
      classification: undefined,
      instagram: undefined,
      snapchat: undefined,
    });

    Toast.show({
      type: "success",
      text1: Content.createPNMSuccess.title,
      text2: Content.createPNMSuccess.message,
    });

    handleClose();
  };

  return (
    <>
      <View style={tw`mb-2`}>
        <Text variant="title">Finalize</Text>
        <Text variant="body">Does this look correct?</Text>
      </View>

      {Object.keys(fields).map((key) => {
        const value = state[key as keyof CreatePnmRequest];

        return (
          <ListItem
            key={key}
            pressable={false}
            title={fields[key as keyof typeof fields]}
            subtitle={(value as string) || "N/A"}
          />
        );
      })}

      <ButtonGroup>
        <Button size="sm" color="gray" onPress={prevView}>
          No, Go Back
        </Button>
        <Button
          size="sm"
          onPress={handleSubmission}
          loading={mutation.isLoading}
        >
          Yes, Create
        </Button>
      </ButtonGroup>
    </>
  );
};

export default ManualStep3;
