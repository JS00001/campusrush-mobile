/*
 * Created on Wed Dec 20 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { View } from "react-native";

import BottomSheet from "./Components/BottomSheet";
import BottomSheetContainer from "./Components/BottomSheetContainer";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import date from "@/lib/util/date";
import IconButton from "@/ui/IconButton";
import DetailView from "@/ui/DetailView";
import ButtonGroup from "@/ui/ButtonGroup";
import useCopy from "@/hooks/util/useCopy";
import { EVENT_URL } from "@/api/constants";
import useEvent from "@/hooks/events/useEvent";
import { formatEvent } from "@/lib/util/format";

interface EventProps {
  innerRef: React.RefObject<any>;
  handleCloseModalPress: () => void;
  handlePresentModalPress: (name: string, props?: any) => void;
}

const Event: React.FC<EventProps> = ({
  innerRef,
  handleCloseModalPress,
  handlePresentModalPress,
}) => {
  const copy = useCopy();

  return (
    <BottomSheet
      innerRef={innerRef}
      children={(data) => {
        const eventId = data?.data.eventId;

        const { event: rawEvent, ...actions } = useEvent(eventId);
        const event = formatEvent(rawEvent);

        const eventUrl = `${EVENT_URL}/${event._id}`;

        const deleteEvent = async () => {
          handleCloseModalPress();
          actions.delete();
        };

        const onEditPress = () => {
          handlePresentModalPress("UPDATE_EVENT", { eventId: event._id });
        };

        const onSharePress = () => {
          copy(eventUrl, "Event link");
          handleCloseModalPress();
        };

        return (
          <BottomSheetContainer>
            <View style={tw`mb-2 flex-row justify-between items-center`}>
              <View style={tw`shrink`}>
                <Text variant="title">{event.title}</Text>
                <Text variant="body">
                  Added on {date.toString(event.createdAt) || "N/A"}
                </Text>
              </View>

              <View style={tw`flex-row gap-1`}>
                <IconButton
                  size="md"
                  icon="ri-delete-bin-6-line"
                  color={tw.color("red")}
                  onPress={deleteEvent}
                  loading={actions.loading === "deleting"}
                />
              </View>
            </View>

            <DetailView>
              <DetailView.Section
                alternate
                title="Description"
                content={event.description}
              />
              <DetailView.Section title="Date" content={event.dateString} />
              <DetailView.Section
                title="Starts at"
                content={event.start.time}
              />
              <DetailView.Section title="Ends at" content={event.end.time} />
              <DetailView.Section title="Location" content={event.location} />
              <DetailView.Section
                title="# Responded Yes"
                content={event.yesCount.toString()}
              />
              <DetailView.Section
                title="# Responded No"
                content={event.noCount.toString()}
              />
            </DetailView>

            <ButtonGroup>
              <Button size="sm" color="gray" onPress={onEditPress}>
                Edit
              </Button>
              <Button size="sm" onPress={onSharePress}>
                Share
              </Button>
            </ButtonGroup>
          </BottomSheetContainer>
        );
      }}
    />
  );
};

export default Event;
