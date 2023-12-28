/*
 * Created on Wed Dec 27 2023
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
import type { DateTimePickerEvent } from "@react-native-community/datetimepicker";

import { AddEventScreens } from "./types";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import ButtonGroup from "@/ui/ButtonGroup";
import DateTimePicker from "@/ui/DateTimePicker";
import { UseCreateEvent } from "@/hooks/events/useCreateEvent";

interface AddEventStep2Props extends UseCreateEvent {
  setScreen: (screen: AddEventScreens) => void;
  handleCloseModalPress: () => void;
  handleSnapToIndex: (index: number) => void;
  handleSnapToPosition: (position: string) => void;
}

const AddEventStep2: React.FC<AddEventStep2Props> = ({
  setScreen,
  handleSnapToIndex,
  handleSnapToPosition,
  handleCloseModalPress,
  ...props
}) => {
  const today = new Date();

  const startDate = new Date(parseInt(props.startDate));
  const endDate = new Date(parseInt(props.endDate));

  const onBackPress = () => {
    setScreen(AddEventScreens.AddEventStep1);
  };

  // When the next button is pressed, make sure the fields are valid
  // and then go to the next step
  const onNextPress = () => {
    const isValid = props.validateFields(["startDate", "endDate"]);

    if (!isValid) return;

    setScreen(AddEventScreens.AddEventStep3);
  };

  const onDateTimeChange = (
    event: DateTimePickerEvent,
    field: "startDate" | "endDate",
    date?: Date,
  ) => {
    const { type } = event;

    if (type === "set") {
      const time = date?.getTime();

      // If the time is null, then the user dismissed the picker
      // so we should just return
      if (!time) return;

      // Otherwise, set the start date to the time
      props.setField(field, time.toString());
    }
  };

  return (
    <View style={tw`gap-y-4`}>
      <View style={tw`mb-2`}>
        <Text variant="title">When's the Event?</Text>
        <Text variant="body">
          Enter when your event starts and ends. This can be changed later.
        </Text>
      </View>

      <DateTimePicker
        label="Starts at:"
        mode="datetime"
        value={startDate}
        minimumDate={today}
        onChange={(event, date) => onDateTimeChange(event, "startDate", date)}
      />
      <DateTimePicker
        label="Ends at:"
        mode="datetime"
        value={endDate}
        minimumDate={startDate}
        onChange={(event, date) => onDateTimeChange(event, "endDate", date)}
      />

      <ButtonGroup>
        <Button size="sm" color="gray" onPress={onBackPress}>
          Go Back
        </Button>
        <Button size="sm" onPress={onNextPress}>
          Next
        </Button>
      </ButtonGroup>
    </View>
  );
};

export default AddEventStep2;
