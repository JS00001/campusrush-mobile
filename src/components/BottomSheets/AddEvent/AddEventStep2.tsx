/*
 * Created on Wed Dec 27 2023
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

import { AddEventScreens } from "./types";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import TextInput from "@/ui/TextInput";
import KeyboardListener from "@/ui/KeyboardListener";
import { UseCreateEvent } from "@/hooks/events/useCreateEvent";
import ButtonGroup from "@/ui/ButtonGroup";

interface AddEventStep2Props extends UseCreateEvent {
  setScreen: (screen: AddEventScreens) => void;
  handleCloseModalPress: () => void;
  handleSnapToIndex: (index: number) => void;
  handleSnapToPosition: (position: string) => void;
}

const AddEventStep2: React.FC<AddEventStep2Props> = ({
  setScreen,
  handleSnapToIndex,
  handleSnapToPosition,
  handleCloseModalPress,
  ...props
}) => {
  const onBackPress = () => {
    setScreen(AddEventScreens.AddEventStep1);
  };

  // When the next button is pressed, make sure the fields are valid
  // and then go to the next step
  const onNextPress = () => {
    const isValid = props.validateFields(["startDate", "endDate"]);

    if (!isValid) return;

    setScreen(AddEventScreens.AddEventStep3);
  };

  return (
    <View style={tw`gap-y-4`}>
      <View style={tw`mb-2`}>
        <Text variant="title">When's the Event?</Text>
        <Text variant="body">
          Enter when your event starts and ends. This can be changed later.
        </Text>
      </View>

      <TextInput placeholder="Start Date" />

      <TextInput placeholder="End Date" />

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

export default AddEventStep2;
