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

import { useMemo, useState } from "react";
import { Pressable } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";

import { AddPnmScreens, ScreensList } from "./types";

import tw from "@/lib/tailwind";
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
  const navigation = useNavigation();

  // Memoized snap points (When the bottom sheet modal is open)
  const snapPoints = useMemo(() => ["55%", "75%", "95%"], []);
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

  // Create a list of all of the screens
  const ScreensList: ScreensList = {
    [AddPnmScreens.AddPnm]: {
      position: "55%",
      component: (
        <AddPnm
          setScreen={setScreen}
          handleCloseModalPress={handleCloseModalPress}
        />
      ),
    },
    [AddPnmScreens.AddManualStep1]: {
      position: "95%",
      component: (
        <AddManualStep1
          setScreen={setScreen}
          handleCloseModalPress={handleCloseModalPress}
        />
      ),
    },
    [AddPnmScreens.AddManualStep2]: {
      position: "80%",
      component: (
        <AddManualStep2
          setScreen={setScreen}
          handleCloseModalPress={handleCloseModalPress}
        />
      ),
    },
    [AddPnmScreens.AddManualStep3]: {
      position: "80%",
      component: (
        <AddManualStep3
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
