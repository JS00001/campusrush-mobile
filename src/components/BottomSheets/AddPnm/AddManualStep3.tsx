/*
 * Created on Mon Oct 16 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useEffect } from "react";
import { View } from "react-native";

import { AddPnmScreens } from "./types";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import ListItem from "@/ui/ListItem";
import ButtonGroup from "@/ui/ButtonGroup";
import type { UseCreatePnm } from "@/hooks/pnms/useCreatePnm";

/**
 * The props for this screen extend the values of the "useCreatePnm" hook
 * This is because all of the values from the hook are passed from the parent
 * component, and the parent component is the one that is responsible for
 * handling the state of the forms.
 */
interface AddManualStep3ScreenProps extends UseCreatePnm {
  setScreen: (screen: AddPnmScreens) => void;

  handleCloseModalPress: () => void;
  handleSnapToIndex: (index: number) => void;
  handleSnapToPosition: (position: string) => void;
}

const AddManualStep3: React.FC<AddManualStep3ScreenProps> = ({
  setScreen,
  handleCloseModalPress,
  ...props
}) => {
  // These are all the possible form fields and their corresponding labels
  const items = {
    firstName: "First Name",
    lastName: "Last Name",
    phoneNumber: "Phone Number",
    classification: "Classification",
    instagram: "Instagram",
    snapchat: "Snapchat",
  };

  // When the back button is pressed, return to the previous step
  const onBackPress = () => {
    setScreen(AddPnmScreens.AddManualStep2);
  };

  // When next is pressed, submit the form
  const onNextPress = async () => {
    await props.handleSubmission();
    // TODO: Ensure that the form was submitted successfully
    handleCloseModalPress();
  };

  return (
    <>
      {/* Header and subheader */}
      <View style={tw`mb-2`}>
        <Text variant="title">Finalize</Text>
        <Text variant="body">Does this look correct?</Text>
      </View>

      {/* The list of all the form fields and their values */}
      {Object.keys(items).map((key) => {
        const value = props[key as keyof UseCreatePnm];

        return (
          <ListItem
            key={key}
            pressable={false}
            title={items[key as keyof typeof items]}
            subtitle={(value as string) || "N/A"}
          />
        );
      })}

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

export default AddManualStep3;
