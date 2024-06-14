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

const ManualStep3: React.FC<UseSheetFlowProps<CreatePnmState>> = ({
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
    setState((prevState) => ({
      ...prevState,
      instagram: form.state.instagram.value,
      snapchat: form.state.snapchat.value,
    }));
  };

  return (
    <View style={tw`gap-y-4`}>
      <Headline
        title="Social Media"
        subtitle="Enter the PNM's known social media. This step is optional."
      />

      <FormField
        placeholder="Instagram"
        value={form.state.instagram.value}
        error={form.state.instagram.error}
        onChangeText={form.setValue.bind(null, "instagram")}
      />
      <FormField
        placeholder="Snapchat"
        value={form.state.snapchat.value}
        error={form.state.snapchat.error}
        onChangeText={form.setValue.bind(null, "snapchat")}
      />

      <ButtonGroup>
        <Button size="sm" color="secondary" onPress={prevView}>
          Go Back
        </Button>
        <Button size="sm" onPress={handleSubmission}>
          Next
        </Button>
      </ButtonGroup>
    </View>
  );
};

export default ManualStep3;
