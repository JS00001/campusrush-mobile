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

interface AddManualStep1ScreenProps {
  handleCloseModalPress: () => void;
  setScreen: (screen: AddPnmScreens) => void;
}

const AddManualStep1: React.FC<AddManualStep1ScreenProps> = ({
  setScreen,
  handleCloseModalPress,
}) => {
  return (
    <KeyboardAwareScrollView
      style={tw`p-6`}
      contentContainerStyle={tw`gap-y-4 flex-1`}
    >
      <View style={tw`mb-2`}>
        <Text variant="title">Add PNM Manually</Text>
        <Text variant="body">Add a PNM to your chapter</Text>
      </View>

      <TextInput placeholder="First Name" />
      <TextInput placeholder="Last Name" />
      <TextInput placeholder="Phone Number" />
      <TextInput placeholder="Instagram" />
      <TextInput placeholder="Snapchat" />
      <TextInput placeholder="Classification" />
      <Button size="sm" iconRight="ri-arrow-right-line">
        Add PNM
      </Button>
    </KeyboardAwareScrollView>
  );
};

export default AddManualStep1;
