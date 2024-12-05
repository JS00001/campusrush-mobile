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

import type { CreatePnmState } from "..";

import type { UseSheetFlowProps } from "@/hooks/useSheetFlow";

import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import Headline from "@/ui/Headline";
import useForm from "@/hooks/useForm";
import FormField from "@/ui/FormField";
import ButtonGroup from "@/ui/ButtonGroup";
import validators from "@/constants/validators";
import useKeyboardListener from "@/hooks/useKeyboardListener";

const ManualStep1: React.FC<UseSheetFlowProps<CreatePnmState>> = ({
  state,
  nextView,
  prevView,
  setState,
  snapToIndex,
  snapToPosition,
}) => {
  useKeyboardListener({
    onKeyboardWillShow: () => {
      snapToPosition("85%");
    },
    onKeyboardWillHide: () => {
      snapToIndex(0);
    },
  });

  const formValidators = {
    firstName: validators.firstName,
    lastName: validators.lastName,
    phoneNumber: validators.phoneNumber,
  };

  const form = useForm({
    validators: formValidators,
    initialValues: {
      firstName: state.firstName,
      lastName: state.lastName,
      phoneNumber: state.phoneNumber,
    },
  });

  const handleSubmission = () => {
    const isValid = form.validateState();

    if (!isValid) {
      return;
    }

    nextView();
    setState((prevState) => ({
      ...prevState,
      firstName: form.state.firstName.value,
      lastName: form.state.lastName.value,
      phoneNumber: form.state.phoneNumber.value,
    }));
  };
  return (
    <View style={tw`gap-y-4`}>
      <Headline
        title="Basic Information"
        subtitle="Enter the PNM's name and contact information"
      />

      <View style={tw`gap-y-2`}>
        <FormField
          placeholder="First Name"
          value={form.state.firstName.value}
          error={form.state.firstName.error}
          onChangeText={form.setValue.bind(null, "firstName")}
        />
        <FormField
          placeholder="Last Name"
          value={form.state.lastName.value}
          error={form.state.lastName.error}
          onChangeText={form.setValue.bind(null, "lastName")}
        />
        <FormField
          placeholder="Phone Number"
          value={form.state.phoneNumber.value}
          error={form.state.phoneNumber.error}
          onChangeText={form.setValue.bind(null, "phoneNumber")}
        />
      </View>

      <ButtonGroup>
        <Button color="secondary" onPress={prevView}>
          Go Back
        </Button>
        <Button onPress={handleSubmission}>Next</Button>
      </ButtonGroup>
    </View>
  );
};

export default ManualStep1;
