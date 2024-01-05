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

import AddPnm from "./AddPnm";
import AddQrCodeStep from "./AddQrCode";
import AddManualStep1 from "./AddManualStep1";
import AddManualStep2 from "./AddManualStep2";
import AddManualStep3 from "./AddManualStep3";
import { AddPnmScreens, ScreensList } from "./types";

import BottomSheet from "../Components/BottomSheet";
import BottomSheetContainer from "../Components/BottomSheetContainer";

import useCreatePnm from "@/hooks/pnms/useCreatePnm";

interface AddPnmProps {
  innerRef: React.RefObject<any>;
  handleCloseModalPress: () => void;
  handleSnapToIndex: (index: number) => void;
  handleSnapToPosition: (position: string) => void;
}

const AddPnmRoot: React.FC<AddPnmProps> = ({
  innerRef,
  handleCloseModalPress,
  handleSnapToIndex,
  handleSnapToPosition,
}) => {
  const { ...values } = useCreatePnm();
  const [screen, setScreen] = useState<AddPnmScreens>(AddPnmScreens.AddPnm);

  // When the bottom sheet modal is open
  const onBottomSheetChange = (index: number) => {
    // If the bottom sheet modal is open
    if (!(index >= 0)) {
      setScreen(AddPnmScreens.AddPnm);
    }
  };

  // Create a list of all of the screens, pass the values of the hook to the screens
  // that need them, and then render the proper screen based on the current screen
  const ScreensList: ScreensList = {
    [AddPnmScreens.AddPnm]: {
      component: (
        <AddPnm
          setScreen={setScreen}
          handleCloseModalPress={handleCloseModalPress}
        />
      ),
    },
    [AddPnmScreens.AddManualStep1]: {
      component: (
        <AddManualStep1
          {...values}
          setScreen={setScreen}
          handleSnapToIndex={handleSnapToIndex}
          handleSnapToPosition={handleSnapToPosition}
          handleCloseModalPress={handleCloseModalPress}
        />
      ),
    },
    [AddPnmScreens.AddManualStep2]: {
      component: (
        <AddManualStep2
          {...values}
          setScreen={setScreen}
          handleSnapToIndex={handleSnapToIndex}
          handleSnapToPosition={handleSnapToPosition}
          handleCloseModalPress={handleCloseModalPress}
        />
      ),
    },
    [AddPnmScreens.AddManualStep3]: {
      component: (
        <AddManualStep3
          {...values}
          setScreen={setScreen}
          handleSnapToIndex={handleSnapToIndex}
          handleSnapToPosition={handleSnapToPosition}
          handleCloseModalPress={handleCloseModalPress}
        />
      ),
    },
    [AddPnmScreens.AddQrCode]: {
      component: (
        <AddQrCodeStep
          setScreen={setScreen}
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

export default AddPnmRoot;
