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

interface AddEventStep1Props extends UseCreateEvent {
  setScreen: (screen: AddEventScreens) => void;
  handleCloseModalPress: () => void;
  handleSnapToIndex: (index: number) => void;
  handleSnapToPosition: (position: string) => void;
}

const AddEventStep1: React.FC<AddEventStep1Props> = ({
  setScreen,
  handleSnapToIndex,
  handleSnapToPosition,
  handleCloseModalPress,
  ...props
}) => {
  // When the next button is pressed, make sure the fields are valid
  // and then go to the next step
  const onNextPress = () => {
    const isValid = props.validateFields(["title", "location", "description"]);

    if (!isValid) return;

    setScreen(AddEventScreens.AddEventStep2);
  };

  const onKeyboardWillShow = () => {
    handleSnapToPosition("95%");
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
          <Text variant="title">What's Your Event About?</Text>
          <Text variant="body">
            Enter your events information below. You can always edit this
            information later.
          </Text>
        </View>

        <TextInput
          placeholder="Title"
          value={props.title}
          error={props.errors?.title}
          onChangeText={(text) => props.setField("title", text)}
        />
        <TextInput
          placeholder="Location"
          value={props.location}
          error={props.errors?.location}
          onChangeText={(text) => props.setField("location", text)}
        />
        <TextInput
          multiline
          blurOnSubmit
          returnKeyType="done"
          value={props.description}
          inputStyle={tw`h-36`}
          placeholder="Description"
          error={props.errors?.description}
          onChangeText={(text) => props.setField("description", text)}
        />

        <Button size="sm" onPress={onNextPress}>
          Next
        </Button>
      </View>
    </KeyboardListener>
  );
};

export default AddEventStep1;
