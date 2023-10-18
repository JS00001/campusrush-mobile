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
import ButtonGroup from "@/ui/ButtonGroup";
import type { UseCreatePnm } from "@/hooks/useCreatePnm";

/**
 * The props for this screen extend the values of the "useCreatePnm" hook
 * This is because all of the values from the hook are passed from the parent
 * component, and the parent component is the one that is responsible for
 * handling the state of the forms.
 */
interface AddManualStep3ScreenProps extends UseCreatePnm {
  handleCloseModalPress: () => void;
  setScreen: (screen: AddPnmScreens) => void;
}

const AddManualStep3: React.FC<AddManualStep3ScreenProps> = ({
  setScreen,
  handleCloseModalPress,
  ...props
}) => {
  // When the back button is pressed, return to the previous step
  const onBackPress = () => {
    setScreen(AddPnmScreens.AddManualStep2);
  };

  const onNextPress = () => {};

  return (
    <KeyboardAwareScrollView
      style={tw`p-6`}
      contentContainerStyle={tw`gap-y-4 flex-1`}
    >
      <View style={tw`mb-2`}>
        <Text variant="title">Finalize</Text>
        <Text variant="body">Does this look correct?</Text>
      </View>

      <ButtonGroup>
        <Button size="sm" color="gray" onPress={onBackPress}>
          No, Go Back
        </Button>
        <Button size="sm" onPress={onNextPress}>
          Yes, Add PNM
        </Button>
      </ButtonGroup>
    </KeyboardAwareScrollView>
  );
};

export default AddManualStep3;
