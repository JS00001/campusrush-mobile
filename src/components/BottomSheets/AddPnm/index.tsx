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

import { Pressable } from "react-native";
import { useMemo, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { AddPnmScreens, ScreensList } from "./types";

import tw from "@/lib/tailwind";
import useCreatePnm from "@/hooks/useCreatePnm";
import AddPnm from "@/components/BottomSheets/AddPnm/AddPnm";
import AddQrCodeStep from "@/components/BottomSheets/AddPnm/AddQrCode";
import AddManualStep1 from "@/components/BottomSheets/AddPnm/AddManualStep1";
import AddManualStep2 from "@/components/BottomSheets/AddPnm/AddManualStep2";
import AddManualStep3 from "@/components/BottomSheets/AddPnm/AddManualStep3";

interface AddPnmProps {
  innerRef: React.RefObject<any>;
  handleCloseModalPress: () => void;
  handleSnapToPosition: (position: string) => void;
}

const AddPnmRoot: React.FC<AddPnmProps> = ({
  innerRef,
  handleCloseModalPress,
  handleSnapToPosition,
}) => {
  // Get the values needed to create a PNM
  const { ...values } = useCreatePnm();

  // Memoized snap points (When the bottom sheet modal is open)
  const snapPoints = useMemo(() => ["45%", "50%", "65%", "80%", "90%"], []);

  // The current screen that is visible
  const [_screen, _setScreen] = useState<AddPnmScreens>(AddPnmScreens.AddPnm);

  // When the bottom sheet modal is open
  const onBottomSheetChange = (index: number) => {
    // If the bottom sheet modal is open
    if (!(index >= 0)) {
      setScreen(AddPnmScreens.AddPnm);
    }
  };

  // Method to set the screen to a new step
  const setScreen = (screen: AddPnmScreens) => {
    // Set the screen
    _setScreen(screen);
    // and then snap to the new position
    handleSnapToPosition(ScreensList[screen].position);
  };

  // Create a list of all of the screens, pass the values of the hook to the screens
  // that need them, and then render the proper screen based on the current screen
  const ScreensList: ScreensList = {
    [AddPnmScreens.AddPnm]: {
      position: "45%",
      component: (
        <AddPnm
          setScreen={setScreen}
          handleCloseModalPress={handleCloseModalPress}
        />
      ),
    },
    [AddPnmScreens.AddManualStep1]: {
      position: "65%",
      component: (
        <AddManualStep1
          {...values}
          setScreen={setScreen}
          handleSnapToPosition={handleSnapToPosition}
          handleCloseModalPress={handleCloseModalPress}
        />
      ),
    },
    [AddPnmScreens.AddManualStep2]: {
      position: "50%",
      component: (
        <AddManualStep2
          {...values}
          setScreen={setScreen}
          handleSnapToPosition={handleSnapToPosition}
          handleCloseModalPress={handleCloseModalPress}
        />
      ),
    },
    [AddPnmScreens.AddManualStep3]: {
      position: "90%",
      component: (
        <AddManualStep3
          {...values}
          setScreen={setScreen}
          handleCloseModalPress={handleCloseModalPress}
        />
      ),
    },
    [AddPnmScreens.AddQrCode]: {
      position: "80%",
      component: (
        <AddQrCodeStep
          setScreen={setScreen}
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

export default AddPnmRoot;
