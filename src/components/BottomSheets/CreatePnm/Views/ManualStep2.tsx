/*
 * Created on Sun Feb 25 2024
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

import type { UseSheetFlowProps } from "@/hooks/useSheetFlow";

import Text from "@/ui_v1/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui_v1/Button";
import useForm from "@/hooks/useForm";
import TextInput from "@/ui_v1/TextInput";
import ButtonGroup from "@/ui_v1/ButtonGroup";
import validators from "@/constants/validators";
import KeyboardListener from "@/ui_v1/KeyboardListener";

const ManualStep2: React.FC<UseSheetFlowProps> = ({
  state,
  nextView,
  prevView,
  setState,
  handleSnapToIndex,
  handleSnapToPosition,
}) => {
  const formValidators = {
    instagram: validators.shortContentString.optional(),
    snapchat: validators.shortContentString.optional(),
  };

  const form = useForm({
    validators: formValidators,
    initialValues: {
      instagram: state.instagram,
      snapchat: state.snapchat,
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
      instagram: form.state.instagram.value,
      snapchat: form.state.snapchat.value,
    }));
  };

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
          value={form.state.instagram.value}
          error={form.state.instagram.error}
          onChangeText={form.setValue.bind(null, "instagram")}
        />
        <TextInput
          placeholder="Snapchat"
          value={form.state.snapchat.value}
          error={form.state.snapchat.error}
          onChangeText={form.setValue.bind(null, "snapchat")}
        />

        <ButtonGroup>
          <Button size="sm" color="gray" onPress={prevView}>
            Go Back
          </Button>
          <Button size="sm" onPress={handleSubmission}>
            Next
          </Button>
        </ButtonGroup>
      </View>
    </KeyboardListener>
  );
};

export default ManualStep2;
