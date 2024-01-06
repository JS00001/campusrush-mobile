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
import DetailView from "@/ui/DetailView";
import ButtonGroup from "@/ui/ButtonGroup";
import useCopy from "@/hooks/util/useCopy";
import { EVENT_URL } from "@/api/constants";
import useEventsStore from "@/state/events";
import { formatEvent } from "@/lib/util/format";
import { useBottomSheets } from "@/providers/BottomSheet";

interface EventProps {
  innerRef: React.RefObject<any>;
  handleCloseModalPress: () => void;
}

const Event: React.FC<EventProps> = ({ handleCloseModalPress, innerRef }) => {
  const copy = useCopy();
  const { handlePresentModalPress } = useBottomSheets();

  return (
    <BottomSheet
      innerRef={innerRef}
      children={(data) => {
        const eventId = data?.data.eventId;

        const event = useEventsStore((state) =>
          formatEvent(state.getEvent(eventId)),
        );

        const eventUrl = `${EVENT_URL}/${event._id}`;

        const onEditPress = () => {
          handlePresentModalPress("UPDATE_EVENT", { eventId: event._id });
        };

        const onSharePress = () => {
          copy(eventUrl, "Event link");
          handleCloseModalPress();
        };

        return (
          <BottomSheetContainer>
            <View style={tw`mb-2`}>
              <Text variant="title">{event.title}</Text>
              <Text variant="body">{event.description}</Text>
            </View>

            <DetailView>
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
                Edit Event
              </Button>
              <Button size="sm" onPress={onSharePress}>
                Share Event
              </Button>
            </ButtonGroup>
          </BottomSheetContainer>
        );
      }}
    />
  );
};

export default Event;
