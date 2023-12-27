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

import { useState } from "react";

import AddEventStep1 from "./AddEventStep1";
import AddEventStep2 from "./AddEventStep2";
import AddEventStep3 from "./AddEventStep3";
import { AddEventScreens, ScreensList } from "./types";

import BottomSheet from "../Components/BottomSheet";
import BottomSheetContainer from "../Components/BottomSheetContainer";

import useCreateEvent from "@/hooks/events/useCreateEvent";

interface AddEventProps {
  innerRef: React.RefObject<any>;

  handleCloseModalPress: () => void;
  handleSnapToIndex: (index: number) => void;
  handleSnapToPosition: (position: string) => void;
}

const AddEventRoot: React.FC<AddEventProps> = ({
  innerRef,

  handleCloseModalPress,
  handleSnapToIndex,
  handleSnapToPosition,
}) => {
  const { ...values } = useCreateEvent();
  const [screen, setScreen] = useState<AddEventScreens>(
    AddEventScreens.AddEventStep1,
  );

  // When the bottom sheet modal is open
  const onBottomSheetChange = (index: number) => {
    // If the bottom sheet modal is open
    if (!(index >= 0)) {
      setScreen(AddEventScreens.AddEventStep1);
    }
  };

  // Create a list of all of the screens, pass the values of the hook to the screens
  // that need them, and then render the proper screen based on the current screen
  const ScreensList: ScreensList = {
    [AddEventScreens.AddEventStep1]: {
      component: (
        <AddEventStep1
          {...values}
          setScreen={setScreen}
          handleSnapToIndex={handleSnapToIndex}
          handleSnapToPosition={handleSnapToPosition}
          handleCloseModalPress={handleCloseModalPress}
        />
      ),
    },
    [AddEventScreens.AddEventStep2]: {
      component: (
        <AddEventStep2
          {...values}
          setScreen={setScreen}
          handleSnapToIndex={handleSnapToIndex}
          handleSnapToPosition={handleSnapToPosition}
          handleCloseModalPress={handleCloseModalPress}
        />
      ),
    },
    [AddEventScreens.AddEventStep3]: {
      component: (
        <AddEventStep3
          {...values}
          setScreen={setScreen}
          handleSnapToIndex={handleSnapToIndex}
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

export default AddEventRoot;
