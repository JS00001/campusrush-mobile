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

import tw from "@/lib/tailwind";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { AddPnmScreens } from "./types";

import Text from "@/ui/Text";
import Button from "@/ui/Button";
import TextInput from "@/ui/TextInput";
import ButtonGroup from "@/ui/ButtonGroup";

interface AddManualStep2ScreenProps {
  handleCloseModalPress: () => void;
  setScreen: (screen: AddPnmScreens) => void;
}

const AddManualStep2: React.FC<AddManualStep2ScreenProps> = ({
  setScreen,
  handleCloseModalPress,
}) => {
  const onBackPress = () => {
    setScreen(AddPnmScreens.AddManualStep1);
  };

  const onNextPress = () => {
    setScreen(AddPnmScreens.AddManualStep3);
  };

  return (
    <KeyboardAwareScrollView
      style={tw`p-6`}
      contentContainerStyle={tw`gap-y-4 flex-1`}
    >
      <View style={tw`mb-2`}>
        <Text variant="title">Social Media</Text>
        <Text variant="body">Enter the PNM's known social media</Text>
      </View>

      <TextInput placeholder="Instagram" />
      <TextInput placeholder="Snapchat" />

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

export default AddManualStep2;
