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

import { useState } from "react";

import { NewMessageScreens, ScreensList } from "./types";

import BottomSheet from "../Components/BottomSheet";
import BottomSheetContainer from "../Components/BottomSheetContainer";

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
  // State to keep track of which screen the user is on
  const [screen, setScreen] = useState<NewMessageScreens>(
    NewMessageScreens.NewMessage,
  );

  // // If the bottom sheet modal is closed, reset the screen to step 1
  const onBottomSheetChange = (index: number) => {
    if (index === -1) {
      setScreen(NewMessageScreens.NewMessage);
    }
  };

  // Create a list of all of the screens
  const ScreensList: ScreensList = {
    [NewMessageScreens.NewMessage]: {
      component: (
        <NewMessage
          setScreen={setScreen}
          handleCloseModalPress={handleCloseModalPress}
        />
      ),
    },
    [NewMessageScreens.DirectMessage]: {
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
  const ScreenComponent = ScreensList[screen].component;

  return (
    <BottomSheet innerRef={innerRef} onChange={onBottomSheetChange}>
      <BottomSheetContainer>{ScreenComponent}</BottomSheetContainer>
    </BottomSheet>
  );
};

export default NewMessageRoot;
