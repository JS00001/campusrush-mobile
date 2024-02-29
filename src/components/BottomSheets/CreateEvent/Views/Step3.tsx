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
import Toast from "react-native-toast-message";

import { useEventStore } from "@/store";
import { useCreateEvent } from "@/hooks/api/events";
import { UseSheetFlowProps } from "@/hooks/useSheetFlow";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import ListItem from "@/ui/ListItem";
import Content from "@/constants/content";
import ButtonGroup from "@/ui/ButtonGroup";

const Step3: React.FC<UseSheetFlowProps> = ({
  state,
  setState,
  prevView,
  handleClose,
}) => {
  const mutation = useCreateEvent();
  const eventStore = useEventStore();

  const handleSubmission = async () => {
    const res = await mutation.mutateAsync(state as CreateEventRequest);

    if ("error" in res) return;

    setState({
      title: undefined,
      description: undefined,
      location: undefined,
      startDate: undefined,
      endDate: undefined,
    });

    eventStore.addOrUpdateEvent(res.data.event);

    Toast.show({
      type: "success",
      text1: Content.createEventSuccess.title,
      text2: Content.createEventSuccess.message,
    });

    handleClose();
  };

  const startDate = new Date(parseInt(state.startDate));
  const endDate = new Date(parseInt(state.endDate));

  const formattedStartDate = `${startDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} on ${startDate.toLocaleDateString([], {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}`;

  const formattedEndDate = `${endDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} on ${startDate.toLocaleDateString([], {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}`;

  return (
    <>
      {/* Header and subheader */}
      <View style={tw`mb-2`}>
        <Text variant="title">Finalize</Text>
        <Text variant="body">Does this look correct?</Text>
      </View>

      {/* The list of all the form fields and their values */}

      <ListItem
        pressable={false}
        title="Title"
        subtitle={state.title || "N/A"}
      />
      <ListItem
        pressable={false}
        title="Location"
        subtitle={(state.location as string) || "N/A"}
      />
      <ListItem
        pressable={false}
        title="Starts at"
        subtitle={state.startDate ? formattedStartDate : "N/A"}
      />
      <ListItem
        pressable={false}
        title="Ends at"
        subtitle={state.endDate ? formattedEndDate : "N/A"}
      />

      <ListItem
        pressable={false}
        title="Description"
        subtitle={(state.description as string) || "N/A"}
      />

      <ButtonGroup>
        <Button
          size="sm"
          color="gray"
          onPress={prevView}
          disabled={mutation.isLoading}
        >
          No, Go Back
        </Button>
        <Button
          size="sm"
          onPress={handleSubmission}
          loading={mutation.isLoading}
        >
          Yes, Create
        </Button>
      </ButtonGroup>
    </>
  );
};

export default Step3;
