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
import { useEffect, useState } from "react";

import { BottomSheetProps } from "./@types";

import useCopy from "@/hooks/useCopy";
import { useEventStore } from "@/store";
import { useDeleteEvent, useGetEvent } from "@/hooks/api/events";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import date from "@/lib/util/date";
import AppConstants from "@/constants";
import IconButton from "@/ui/IconButton";
import DetailView from "@/ui/DetailView";
import ButtonGroup from "@/ui/ButtonGroup";
import { formatEvent } from "@/lib/util/format";
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
      children={(data) => {
        const eventId = data?.data.eventId;

        const eventQuery = useGetEvent(eventId);
        const eventsStore = useEventStore();
        const deleteMutation = useDeleteEvent();

        const eventUrl = `${AppConstants.eventUrl}/${eventId}`;

        /**
         * We need to use state here as a 'cache', because when the pnm is deleted,
         * the store value becomes undefined, and we need to keep the pnm data so
         * the app doesnt crash before the bottom sheet is closed.
         */
        const [event, setEvent] = useState(eventQuery.event);
        const formattedEvent = formatEvent(event as Event);

        useEffect(() => {
          if (eventQuery.event) {
            setEvent(eventQuery.event);
          }
        }, [eventQuery.event]);

        const onDelete = async () => {
          if (!event) return;

          const res = await deleteMutation.mutateAsync({ id: eventId });

          if ("error" in res) return;

          eventsStore.deleteEvent(eventId);

          handleClose();
        };

        const onEditPress = () => {
          openBottomSheet("UPDATE_EVENT", { eventId });
        };

        const onShare = () => {
          copy(eventUrl, "Event link");
          handleClose();
        };

        // TODO: Add proper loading state
        if (!event) {
          return <Text>Loading...</Text>;
        }

        return (
          <BottomSheetContainer>
            <View style={tw`mb-2 flex-row justify-between items-center`}>
              <View style={tw`shrink`}>
                <Text variant="title">{formattedEvent.title}</Text>
                <Text variant="body">
                  Added on {date.toString(formattedEvent.createdAt) || "N/A"}
                </Text>
              </View>

              <View style={tw`flex-row gap-1`}>
                <IconButton
                  size="md"
                  icon="ri-delete-bin-6-line"
                  color={tw.color("red")}
                  onPress={onDelete}
                  loading={deleteMutation.isLoading}
                />
              </View>
            </View>

            <DetailView>
              <DetailView.Section
                alternate
                title="Description"
                content={event.description}
              />
              <DetailView.Section
                title="Date"
                content={formattedEvent.dateString}
              />
              <DetailView.Section
                title="Starts at"
                content={formattedEvent.start.time}
              />
              <DetailView.Section
                title="Ends at"
                content={formattedEvent.end.time}
              />
              <DetailView.Section
                title="Location"
                content={formattedEvent.location}
              />
              <DetailView.Section
                title="# Responded Yes"
                content={formattedEvent.yesCount.toString()}
              />
              <DetailView.Section
                title="# Responded No"
                content={formattedEvent.noCount.toString()}
              />
            </DetailView>

            <ButtonGroup>
              <Button size="sm" color="gray" onPress={onEditPress}>
                Edit
              </Button>
              <Button size="sm" onPress={onShare}>
                Share
              </Button>
            </ButtonGroup>
          </BottomSheetContainer>
        );
      }}
    />
  );
};

export default EventSheet;
