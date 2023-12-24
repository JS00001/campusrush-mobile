/*
 * Created on Mon Oct 16 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { View } from "react-native";

import { AddPnmScreens } from "./types";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import TextInput from "@/ui/TextInput";
import ButtonGroup from "@/ui/ButtonGroup";
import type { UseCreatePnm } from "@/hooks/pnms/useCreatePnm";

/**
 * The props for this screen extend the values of the "useCreatePnm" hook
 * This is because all of the values from the hook are passed from the parent
 * component, and the parent component is the one that is responsible for
 * handling the state of the forms.
 */
interface AddManualStep1ScreenProps extends UseCreatePnm {
  handleCloseModalPress: () => void;
  setScreen: (screen: AddPnmScreens) => void;
  handleSnapToPosition: (position: string) => void;
}

const AddManualStep1: React.FC<AddManualStep1ScreenProps> = ({
  setScreen,
  handleSnapToPosition,
  handleCloseModalPress,
  ...props
}) => {
  // When the back button is pressed, return to the previous step
  const onBackPress = () => {
    setScreen(AddPnmScreens.AddPnm);
  };

  // When the next button is pressed, make sure the fields are valid
  // and then go to the next step
  const onNextPress = () => {
    const isValid = props.validateFields([
      "firstName",
      "lastName",
      "phoneNumber",
    ]);

    if (!isValid) return;

    setScreen(AddPnmScreens.AddManualStep2);
  };

  // When a text input is focused (keyboard is opened), snap to the top
  // so that the user can see the inputs fully
  const onFocus = () => {
    handleSnapToPosition("95%");
  };

  return (
    <View style={tw`gap-y-4`}>
      <View style={tw`mb-2`}>
        <Text variant="title">Basic Information</Text>
        <Text variant="body">Enter the PNM's name and contact information</Text>
      </View>

      <TextInput
        placeholder="First Name"
        value={props.firstName}
        onFocus={onFocus}
        error={props.errors?.firstName}
        onChangeText={props.setFirstName}
      />
      <TextInput
        placeholder="Last Name"
        value={props.lastName}
        onFocus={onFocus}
        error={props.errors?.lastName}
        onChangeText={props.setLastName}
      />
      <TextInput
        placeholder="Phone Number"
        value={props.phoneNumber}
        onFocus={onFocus}
        error={props.errors?.phoneNumber}
        onChangeText={props.setPhoneNumber}
      />
      <TextInput
        placeholder="Classification"
        value={props.classification}
        onFocus={onFocus}
        error={props.errors?.classification}
        onChangeText={props.setClassification}
      />

      <ButtonGroup>
        <Button size="sm" color="gray" onPress={onBackPress}>
          Go Back
        </Button>
        <Button size="sm" onPress={onNextPress}>
          Next
        </Button>
      </ButtonGroup>
    </View>
  );
};

export default AddManualStep1;
