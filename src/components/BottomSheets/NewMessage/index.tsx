/*
 * Created on Tue Oct 17 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { Pressable } from "react-native";
import { useMemo, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { NewMessageScreens, ScreensList } from "./types";

import tw from "@/lib/tailwind";
import useContacts from "@/hooks/messaging/useContacts";
import NewMessage from "@/components/BottomSheets/NewMessage/NewMessage";
import DirectMessage from "@/components/BottomSheets/NewMessage/DirectMessage";

interface NewMessageProps {
  innerRef: React.RefObject<any>;
  handleCloseModalPress: () => void;
  handleSnapToPosition: (position: string) => void;
}

const NewMessageRoot: React.FC<NewMessageProps> = ({
  innerRef,
  handleCloseModalPress,
  handleSnapToPosition,
}) => {
  // Custom hook to get contacts
  const { refetch } = useContacts();
  // Memoized snap points (When the bottom sheet modal is open)
  const snapPoints = useMemo(() => ["65%", "80%", "95%"], []);
  // State to keep track of which screen the user is on
  const [_screen, _setScreen] = useState<NewMessageScreens>(
    NewMessageScreens.NewMessage,
  );

  // When the bottom sheet modal is open
  const onBottomSheetChange = (index: number) => {
    // If the bottom sheet modal is open
    if (index >= 0) {
      // Refetch the contacts
      refetch();
    }
    // // If the bottom sheet modal is closed
    else {
      // Reset the screen
      setScreen(NewMessageScreens.NewMessage);
    }
  };

  // Method to set the screen to a new step
  const setScreen = (screen: NewMessageScreens) => {
    // Set the screen
    _setScreen(screen);
    // and then snap to the new position
    handleSnapToPosition(ScreensList[screen].position);
  };

  // Create a list of all of the screens
  const ScreensList: ScreensList = {
    [NewMessageScreens.NewMessage]: {
      position: "65%",
      component: (
        <NewMessage
          setScreen={setScreen}
          handleCloseModalPress={handleCloseModalPress}
        />
      ),
    },
    [NewMessageScreens.DirectMessage]: {
      position: "80%",
      component: (
        <DirectMessage
          setScreen={setScreen}
          handleSnapToPosition={handleSnapToPosition}
          handleCloseModalPress={handleCloseModalPress}
        />
      ),
    },
  };

  // Select the proper screen
  const ScreenComponent = ScreensList[_screen].component;

  return (
    <BottomSheetModal
      ref={innerRef}
      index={0}
      snapPoints={snapPoints}
      onChange={onBottomSheetChange}
      backdropComponent={() => (
        <Pressable
          style={tw`h-full w-full absolute bg-black opacity-20`}
          onPress={handleCloseModalPress}
        />
      )}
    >
      {ScreenComponent}
    </BottomSheetModal>
  );
};

export default NewMessageRoot;
