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

import { z } from "zod";
import { View } from "react-native";

import type { CreatePnmState } from "..";

import type { UseSheetFlowProps } from "@/hooks/useSheetFlow";

import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import Headline from "@/ui/Headline";
import useForm from "@/hooks/useForm";
import ButtonGroup from "@/ui/ButtonGroup";
import TagSelector from "@/components/TagSelector";

const ManualStep2: React.FC<UseSheetFlowProps<CreatePnmState>> = ({
  state,
  nextView,
  prevView,
  setState,
}) => {
  const formValidators = {
    tags: z.array(z.string()),
  };

  const form = useForm({
    validators: formValidators,
    initialValues: {
      tags: state.tags,
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
      tags: form.state.tags.value,
    }));
  };

  return (
    <View style={tw`gap-y-4`}>
      <Headline
        title="Add Tags"
        subtitle="Add some tags to this PNM. This step is optional."
      />

      <TagSelector
        values={form.state.tags.value}
        onChange={(values) => form.setValue("tags", values)}
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

export default ManualStep2;
