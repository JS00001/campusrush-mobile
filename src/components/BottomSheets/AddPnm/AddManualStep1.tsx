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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { AddPnmScreens } from "./types";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import TextInput from "@/ui/TextInput";
import ButtonGroup from "@/ui/ButtonGroup";

interface AddManualStep1ScreenProps {
  handleCloseModalPress: () => void;
  setScreen: (screen: AddPnmScreens) => void;
  handleSnapToPosition: (position: string) => void;
}

const AddManualStep1: React.FC<AddManualStep1ScreenProps> = ({
  setScreen,
  handleSnapToPosition,
  handleCloseModalPress,
}) => {
  const onBackPress = () => {
    setScreen(AddPnmScreens.AddPnm);
  };

  const onNextPress = () => {
    setScreen(AddPnmScreens.AddManualStep2);
  };

  return (
    <KeyboardAwareScrollView
      style={tw`p-6`}
      contentContainerStyle={tw`gap-y-4 flex-1`}
    >
      <View style={tw`mb-2`}>
        <Text variant="title">Basic Information</Text>
        <Text variant="body">Enter the PNM's name and contact information</Text>
      </View>

      <TextInput placeholder="First Name" />
      <TextInput placeholder="Last Name" />
      <TextInput placeholder="Phone Number" />
      <TextInput placeholder="Classification" />

      <ButtonGroup>
        <Button size="sm" color="gray" onPress={onBackPress}>
          Go Back
        </Button>
        <Button size="sm" onPress={onNextPress}>
          Next
        </Button>
      </ButtonGroup>
    </KeyboardAwareScrollView>
  );
};

export default AddManualStep1;
