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

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import useForm from "@/hooks/useForm";
import TextInput from "@/ui/TextInput";
import ButtonGroup from "@/ui/ButtonGroup";
import validators from "@/constants/validators";
import KeyboardListener from "@/ui/KeyboardListener";

const ManualStep1: React.FC<UseSheetFlowProps> = ({
  state,
  nextView,
  prevView,
  setState,
  handleSnapToIndex,
  handleSnapToPosition,
}) => {
  const formValidators = {
    firstName: validators.firstName,
    lastName: validators.lastName,
    phoneNumber: validators.phoneNumber,
    classification: validators.shortContentString.optional(),
  };

  const form = useForm({
    validators: formValidators,
    initialValues: {
      firstName: state.firstName,
      lastName: state.lastName,
      phoneNumber: state.phoneNumber,
      classification: state.classification,
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
      firstName: form.state.firstName.value,
      lastName: form.state.lastName.value,
      phoneNumber: form.state.phoneNumber.value,
      classification: form.state.classification.value,
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
          <Text variant="title">Basic Information</Text>
          <Text variant="body">
            Enter the PNM's name and contact information
          </Text>
        </View>

        <TextInput
          placeholder="First Name"
          value={form.state.firstName.value}
          error={form.state.firstName.error}
          onChangeText={form.setValue.bind(null, "firstName")}
        />
        <TextInput
          placeholder="Last Name"
          value={form.state.lastName.value}
          error={form.state.lastName.error}
          onChangeText={form.setValue.bind(null, "lastName")}
        />
        <TextInput
          placeholder="Phone Number"
          value={form.state.phoneNumber.value}
          error={form.state.phoneNumber.error}
          onChangeText={form.setValue.bind(null, "phoneNumber")}
        />
        <TextInput
          placeholder="Classification"
          value={form.state.classification.value}
          error={form.state.classification.error}
          onChangeText={form.setValue.bind(null, "classification")}
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

export default ManualStep1;
