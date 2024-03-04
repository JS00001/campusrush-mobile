/*
 * Created on Mon Feb 26 2024
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

import Text from "@/ui_v1/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui_v1/Button";
import useForm from "@/hooks/useForm";
import TextInput from "@/ui_v1/TextInput";
import validators from "@/constants/validators";
import KeyboardListener from "@/ui_v1/KeyboardListener";
import { UseSheetFlowProps } from "@/hooks/useSheetFlow";

const Step1: React.FC<UseSheetFlowProps> = ({
  state,
  setState,
  handleSnapToIndex,
  handleSnapToPosition,
  nextView,
}) => {
  const formValidators = {
    title: validators.shortContentString,
    description: validators.longContentString,
    location: validators.shortContentString,
  };

  const form = useForm({
    validators: formValidators,
    initialValues: {
      title: state.title,
      description: state.description,
      location: state.location,
    },
  });

  const handleSubmission = () => {
    const isValid = form.validateState();

    if (!isValid) {
      return;
    }

    nextView();
    setState((prevState: any) => ({
      ...prevState,
      title: form.state.title.value,
      description: form.state.description.value,
      location: form.state.location.value,
    }));
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
          value={form.state.title.value}
          error={form.state.title.error}
          onChangeText={form.setValue.bind(null, "title")}
        />
        <TextInput
          placeholder="Location"
          value={form.state.location.value}
          error={form.state.location.error}
          onChangeText={form.setValue.bind(null, "location")}
        />
        <TextInput
          multiline
          blurOnSubmit
          returnKeyType="done"
          value={form.state.description.value}
          inputStyle={tw`h-36`}
          placeholder="Description"
          error={form.state.description.error}
          onChangeText={form.setValue.bind(null, "description")}
        />

        <Button size="sm" onPress={handleSubmission}>
          Next
        </Button>
      </View>
    </KeyboardListener>
  );
};

export default Step1;
