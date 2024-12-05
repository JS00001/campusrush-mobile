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

import { BottomSheetProps, SheetData } from "./@types";

import useCopy from "@/hooks/useCopy";
import { useDeleteEvent, useGetEvent } from "@/hooks/api/events";

import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import { alert } from "@/lib/util";
import date from "@/lib/util/date";
import Headline from "@/ui/Headline";
import format from "@/lib/util/format";
import AppConstants from "@/constants";
import { Detail } from "@/ui/DetailList";
import IconButton from "@/ui/IconButton";
import ButtonGroup from "@/ui/ButtonGroup";
import { useBottomSheetStore } from "@/store";
import { BottomSheet } from "@/ui/BottomSheet";
import ErrorMessage from "@/components/ErrorMessage";
import BottomSheetContainer from "@/ui/BottomSheet/Container";

type Props = BottomSheetProps & SheetData<"EVENT">;

const Content: React.FC<Props> = ({ data, close }) => {
  const initialEvent = data.event;

  const copy = useCopy();
  const bottomSheetStore = useBottomSheetStore();

  const deleteMutation = useDeleteEvent();
  const getEventQuery = useGetEvent(initialEvent._id);

  const eventData = getEventQuery.data?.event || initialEvent;
  const event = format.event(eventData);

  // Error State
  if (getEventQuery.error || !event) {
    return (
      <ErrorMessage
        error={getEventQuery.error}
        description="Failed to load event"
      />
    );
  }

  const eventUrl = `${AppConstants.eventUrl}/${event._id}`;

  const onDelete = async () => {
    alert({
      title: "Delete Event",
      message: "Are you sure you want to delete this event?",
      buttons: [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const eventName = event.title;
            await deleteMutation.mutateAsync({ id: event._id });

            Toast.show({
              type: "success",
              text1: "Event deleted",
              text2: `${eventName} has been deleted successfully`,
            });

            close();
          },
        },
      ],
    });
  };

  const onEditPress = () => {
    bottomSheetStore.open("UPDATE_EVENT", { event });
  };

  const onViewResponsesPress = () => {
    close();
    bottomSheetStore.open("EVENT_RESPONSES", { eventId: event._id });
  };

  const onShare = () => {
    copy(eventUrl, "Event Link");
  };

  return (
    <BottomSheetContainer>
      <View style={tw`mb-2 flex-row justify-between items-center`}>
        <Headline
          style={tw`shrink`}
          title={event.title}
          subtitle={`Created on ${date.toString(event.createdAt)}`}
        />

        <View style={tw`flex-row gap-1`}>
          <IconButton
            ph-label="share-event"
            size="sm"
            iconName="Link"
            color="secondary"
            onPress={onShare}
          />
          <IconButton
            ph-label="delete-event"
            size="sm"
            color="secondary"
            iconName="Trash"
            iconColor={tw.color("red-500")}
            loading={deleteMutation.isPending}
            onPress={onDelete}
          />
        </View>
      </View>

      <Detail.List>
        <Detail.Item
          layout="vertical"
          title="Description"
          value={event.description}
        />
        <Detail.Item title="Date" value={event.dateString} />
        <Detail.Item title="Starts at" value={event.start.time} />
        <Detail.Item title="Ends at" value={event.end.time} />
        <Detail.Item title="Location" value={event.location} />
      </Detail.List>

      <ButtonGroup>
        <Button color="secondary" onPress={onEditPress}>
          Edit
        </Button>
        <Button onPress={onViewResponsesPress}>View Responses</Button>
      </ButtonGroup>
    </BottomSheetContainer>
  );
};

const EventSheet: React.FC<BottomSheetProps> = (props) => {
  return (
    <BottomSheet
      innerRef={props.innerRef}
      children={(data?: SheetData<"EVENT">) => {
        return <Content data={data!.data} {...props} />;
      }}
    />
  );
};

export default EventSheet;
