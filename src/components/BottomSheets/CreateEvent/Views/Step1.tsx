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

import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import Headline from "@/ui/Headline";
import useForm from "@/hooks/useForm";
import FormField from "@/ui/FormField";
import validators from "@/constants/validators";
import { UseSheetFlowProps } from "@/hooks/useSheetFlow";
import useKeyboardListener from "@/hooks/useKeyboardListener";

const Step1: React.FC<UseSheetFlowProps> = ({
  state,
  setState,
  handleSnapToIndex,
  handleSnapToPosition,
  nextView,
}) => {
  useKeyboardListener({
    onKeyboardWillShow: () => {
      handleSnapToPosition("95%");
    },
    onKeyboardWillHide: () => {
      handleSnapToIndex(0);
    },
  });

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

  return (
    <View style={tw`gap-y-4`}>
      <Headline
        title="What's Your Event About?"
        subtitle="Enter your events information below. You can always edit this information later."
      />

      <FormField
        placeholder="Title"
        value={form.state.title.value}
        error={form.state.title.error}
        onChangeText={form.setValue.bind(null, "title")}
      />
      <FormField
        placeholder="Location"
        value={form.state.location.value}
        error={form.state.location.error}
        onChangeText={form.setValue.bind(null, "location")}
      />
      <FormField
        multiline
        blurOnSubmit
        returnKeyType="done"
        value={form.state.description.value}
        placeholder="Description"
        style={tw`h-36`}
        error={form.state.description.error}
        onChangeText={form.setValue.bind(null, "description")}
      />

      <Button size="sm" onPress={handleSubmission}>
        Next
      </Button>
    </View>
  );
};

export default Step1;
