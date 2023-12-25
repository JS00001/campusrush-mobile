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
import { formatEvent } from "@/lib/util/format";
import { useNavigation } from "@react-navigation/native";

interface EventProps {
  innerRef: React.RefObject<any>;
  handleCloseModalPress: () => void;
}

const Event: React.FC<EventProps> = ({ handleCloseModalPress, innerRef }) => {
  const navigation = useNavigation();

  return (
    <BottomSheet
      innerRef={innerRef}
      children={(data) => {
        const event = formatEvent(data?.data.event);

        const onEditPress = () => {
          (navigation.navigate as any)("EventDetails", { event });
          handleCloseModalPress();
        };

        return (
          <BottomSheetContainer>
            <View style={tw`mb-2`}>
              <Text variant="title">{event.title}</Text>
              <Text variant="body">{event.description}</Text>
            </View>

            <DetailView>
              <DetailView.Section title="Date" content={event.day} />
              <DetailView.Section title="Starts at" content={event.startTime} />
              <DetailView.Section title="Ends at" content={event.endTime} />
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
              <Button size="sm">Share Event</Button>
            </ButtonGroup>
          </BottomSheetContainer>
        );
      }}
    />
  );
};

export default Event;
