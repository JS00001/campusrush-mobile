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
import Skeleton from "@/ui/Skeleton";
import format from "@/lib/util/format";
import AppConstants from "@/constants";
import { Detail } from "@/ui/DetailList";
import IconButton from "@/ui/IconButton";
import ButtonGroup from "@/ui/ButtonGroup";
import { BottomSheet } from "@/ui/BottomSheet";
import BottomSheetContainer from "@/ui/BottomSheet/Container";

const EventSheet: React.FC<BottomSheetProps> = ({
  innerRef,
  handleClose,
  openBottomSheet,
}) => {
  const copy = useCopy();

  return (
    <BottomSheet
      innerRef={innerRef}
      children={(props?: SheetData<"EVENT">) => {
        const deleteMutation = useDeleteEvent();

        const event = format.event(props!.data.event);

        // PR_TODO: Erro state, dont let this be loading state
        if (!event) return <LoadingState />;

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
                  const eventName = event?.title || "Event";

                  await deleteMutation.mutateAsync({ id: event._id });

                  Toast.show({
                    type: "success",
                    text1: "Event deleted",
                    text2: `${eventName} has been deleted successfully`,
                  });

                  handleClose();
                },
              },
            ],
          });
        };

        const onEditPress = () => {
          openBottomSheet("UPDATE_EVENT", { event });
        };

        const onViewResponsesPress = () => {
          handleClose();
          openBottomSheet("EVENT_RESPONSES", { eventId: event._id });
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
                subtitle={`Added on ${date.toString(event.createdAt)}`}
              />

              <View style={tw`flex-row gap-1`}>
                <IconButton
                  ph-label="share-event"
                  size="sm"
                  color="secondary"
                  iconName="share-line"
                  onPress={onShare}
                />
                <IconButton
                  ph-label="delete-event"
                  size="sm"
                  color="secondary"
                  iconName="delete-bin-6-line"
                  iconColor={tw.color("red")}
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
              <Button size="sm" color="secondary" onPress={onEditPress}>
                Edit
              </Button>
              <Button size="sm" onPress={onViewResponsesPress}>
                View Responses
              </Button>
            </ButtonGroup>
          </BottomSheetContainer>
        );
      }}
    />
  );
};

const LoadingState = () => {
  return (
    <BottomSheetContainer>
      <View style={tw`mb-2 flex-row justify-between items-center gap-2`}>
        <View style={tw`flex-1 gap-2`}>
          <Skeleton height={24} />
          <Skeleton width={"75%"} height={16} />
        </View>

        <View style={tw`flex-row gap-1`}>
          <Skeleton width={48} height={48} borderRadius={999} />
          <Skeleton width={48} height={48} borderRadius={999} />
        </View>
      </View>

      <Skeleton height={332} />

      <Skeleton height={54} />
    </BottomSheetContainer>
  );
};

export default EventSheet;
