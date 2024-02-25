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
import { AddEventScreens } from "./types";

import Text from "@/ui/Text";
import { UseCreateEvent } from "@/hooksv1/events/useCreateEvent";
import tw from "@/lib/tailwind";
import ListItem from "@/ui/ListItem";
import ButtonGroup from "@/ui/ButtonGroup";
import Button from "@/ui/Button";

interface AddEventStep3Props extends UseCreateEvent {
  setScreen: (screen: AddEventScreens) => void;
  handleCloseModalPress: () => void;
  handleSnapToIndex: (index: number) => void;
  handleSnapToPosition: (position: string) => void;
}

const AddEventStep3: React.FC<AddEventStep3Props> = ({
  setScreen,
  handleCloseModalPress,
  handleSnapToIndex,
  handleSnapToPosition,
  ...props
}) => {
  const onBackPress = () => {
    setScreen(AddEventScreens.AddEventStep2);
  };

  const onNextPress = async () => {
    await props.handleSubmission();
    handleCloseModalPress();
  };

  // Format the millisecond string from startDate and endDate into hh:mm AM/PM on Long Month Day, Year
  const startDate = new Date(Number(props.startDate as string));
  const endDate = new Date(Number(props.endDate as string));

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
      {/* Header and subheader */}
      <View style={tw`mb-2`}>
        <Text variant="title">Finalize</Text>
        <Text variant="body">Does this look correct?</Text>
      </View>

      {/* The list of all the form fields and their values */}

      <ListItem
        pressable={false}
        title="Title"
        subtitle={(props.title as string) || "N/A"}
      />
      <ListItem
        pressable={false}
        title="Location"
        subtitle={(props.location as string) || "N/A"}
      />
      <ListItem
        pressable={false}
        title="Starts at"
        subtitle={props.startDate ? formattedStartDate : "N/A"}
      />
      <ListItem
        pressable={false}
        title="Ends at"
        subtitle={props.endDate ? formattedEndDate : "N/A"}
      />

      <ListItem
        pressable={false}
        title="Description"
        subtitle={(props.description as string) || "N/A"}
      />

      {/* The buttons to submit or go back */}
      <ButtonGroup>
        <Button
          size="sm"
          color="gray"
          onPress={onBackPress}
          disabled={props.isLoading}
        >
          No, Go Back
        </Button>
        <Button size="sm" onPress={onNextPress} loading={props.isLoading}>
          Yes, Create
        </Button>
      </ButtonGroup>
    </>
  );
};

export default AddEventStep3;
