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

import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import date from "@/lib/util/date";
import Headline from "@/ui/Headline";
import Skeleton from "@/ui/Skeleton";
import AppConstants from "@/constants";
import { Detail } from "@/ui/DetailView";
import IconButton from "@/ui/IconButton";
import ButtonGroup from "@/ui/ButtonGroup";
import { BottomSheet } from "@/ui/BottomSheet";
import { formatEvent } from "@/lib/util/format";
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

        if (!event) {
          return <LoadingState />;
        }

        return (
          <BottomSheetContainer>
            <View style={tw`mb-2 flex-row justify-between items-center`}>
              <Headline
                style={tw`shrink`}
                title={formattedEvent.title}
                subtitle={`Added on ${date.toString(formattedEvent.createdAt) || "N/A"}`}
              />

              <View style={tw`flex-row gap-1`}>
                <IconButton
                  size="sm"
                  color="secondary"
                  iconName="delete-bin-6-line"
                  iconColor={tw.color("red")}
                  onPress={onDelete}
                  loading={deleteMutation.isLoading}
                />
              </View>
            </View>

            <Detail.View>
              <Detail.Item
                layout="vertical"
                title="Description"
                value={event.description}
              />
              <Detail.Item title="Date" value={formattedEvent.dateString} />
              <Detail.Item
                title="Starts at"
                value={formattedEvent.start.time}
              />
              <Detail.Item title="Ends at" value={formattedEvent.end.time} />
              <Detail.Item title="Location" value={formattedEvent.location} />
              <Detail.Item
                title="# Responded Yes"
                value={formattedEvent.yesCount.toString()}
              />
              <Detail.Item
                title="# Responded No"
                value={formattedEvent.noCount.toString()}
              />
            </Detail.View>

            <ButtonGroup>
              <Button size="sm" color="secondary" onPress={onEditPress}>
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
        </View>
      </View>

      <Skeleton height={332} />

      <Skeleton height={54} />
    </BottomSheetContainer>
  );
};

export default EventSheet;
