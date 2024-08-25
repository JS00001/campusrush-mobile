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

import Toast from "react-native-toast-message";

import type { CreateEventRequest } from "@/types";
import type { UseSheetFlowProps } from "@/hooks/useSheetFlow";

import type { CreateEventState } from "..";

import Button from "@/ui/Button";
import ListItem from "@/ui/ListItem";
import Headline from "@/ui/Headline";
import { useEventStore } from "@/store";
import ButtonGroup from "@/ui/ButtonGroup";
import usePosthog from "@/hooks/usePosthog";
import { useCreateEvent } from "@/hooks/api/events";

const Step3: React.FC<UseSheetFlowProps<CreateEventState>> = ({
  state,
  setState,
  prevView,
  handleClose,
}) => {
  const posthog = usePosthog();
  const mutation = useCreateEvent();
  const eventStore = useEventStore();

  const handleSubmission = async () => {
    const res = await mutation.mutateAsync(state as CreateEventRequest);

    if ("error" in res) return;

    setState({
      title: undefined,
      description: undefined,
      location: undefined,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    });

    eventStore.addOrUpdateEvent(res.data.event);

    Toast.show({
      type: "success",
      text1: "Successfully created event",
      text2: "Your event has been successfully created",
    });

    posthog.capture("EVENT_CREATED");

    handleClose();
  };

  const startDate = new Date(state.startDate);
  const endDate = new Date(state.endDate);

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
  })} on ${endDate.toLocaleDateString([], {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}`;

  return (
    <>
      <Headline title="Finalize" subtitle="Does this look correct?" />

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
          color="secondary"
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
