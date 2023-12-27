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
import KeyboardListener from "@/ui/KeyboardListener";
import type { UseCreatePnm } from "@/hooks/pnms/useCreatePnm";

/**
 * The props for this screen extend the values of the "useCreatePnm" hook
 * This is because all of the values from the hook are passed from the parent
 * component, and the parent component is the one that is responsible for
 * handling the state of the forms.
 */
interface AddManualStep2ScreenProps extends UseCreatePnm {
  setScreen: (screen: AddPnmScreens) => void;

  handleCloseModalPress: () => void;
  handleSnapToIndex: (index: number) => void;
  handleSnapToPosition: (position: string) => void;
}

const AddManualStep2: React.FC<AddManualStep2ScreenProps> = ({
  setScreen,
  handleSnapToIndex,
  handleSnapToPosition,
  handleCloseModalPress,
  ...props
}) => {
  // When the back button is pressed, return to the previous step
  const onBackPress = () => {
    setScreen(AddPnmScreens.AddManualStep1);
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

    setScreen(AddPnmScreens.AddManualStep3);
  };

  // When a text input is focused (keyboard is opened), snap to the top
  // so that the user can see the inputs fully
  const onKeyboardWillShow = () => {
    handleSnapToPosition("85%");
  };

  const onKeyboardWillHide = () => {
    handleSnapToIndex(0);
  };

  return (
    <KeyboardListener
      onKeyboardWillShow={onKeyboardWillShow}
      onKeyboardWillHide={onKeyboardWillHide}
    >
      <View style={tw`gap-y-4`}>
        <View style={tw`mb-2`}>
          <Text variant="title">Social Media</Text>
          <Text variant="body">Enter the PNM's known social media</Text>
        </View>

        <TextInput
          placeholder="Instagram"
          value={props.instagram}
          onChangeText={props.setInstagram}
          error={props.errors?.instagram}
        />

        <TextInput
          placeholder="Snapchat"
          value={props.snapchat}
          onChangeText={props.setSnapchat}
          error={props.errors?.snapchat}
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
    </KeyboardListener>
  );
};

export default AddManualStep2;
