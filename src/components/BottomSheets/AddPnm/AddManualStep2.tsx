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
import { View, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { AddPnmScreens } from "./types";

import Text from "@/ui/Text";
import Button from "@/ui/Button";

interface AddManualStep2ScreenProps {
  handleCloseModalPress: () => void;
  setScreen: (screen: AddPnmScreens) => void;
}

const AddManualStep2: React.FC<AddManualStep2ScreenProps> = ({
  setScreen,
  handleCloseModalPress,
}) => {
  return (
    <KeyboardAwareScrollView
      style={tw`p-6`}
      contentContainerStyle={tw`gap-y-4 flex-1`}
    >
      <View style={tw`mb-2`}>
        <Text variant="title">Add PNM Manually 2</Text>
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

export default AddManualStep2;
