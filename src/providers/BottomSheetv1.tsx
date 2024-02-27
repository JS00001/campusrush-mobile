/*
 * Created on Sun Sep 10 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { createContext, useCallback, useContext, useRef } from "react";

import BottomSheetComponents from "@/components/BottomSheetsv1";

/**
 * All bottom sheets that can be opened
 *
 * MUST add new bottom sheets here for them to be accessible
 * Put all bottom sheets in the @/components/BottomSheets folder
 */
const BottomSheets = [
  { name: "UPDATE_PNM", component: BottomSheetComponents.UpdatePnm },
];

interface BottomSheetContextProps {
  openBottomSheet: (
    name: (typeof BottomSheets)[number]["name"],
    props?: any,
  ) => void;
  handleSnapToIndex: (
    name: (typeof BottomSheets)[number]["name"],
    index: number,
  ) => void;
  handleSnapToPosition: (
    name: (typeof BottomSheets)[number]["name"],
    position: string,
  ) => void;

  handleCloseModalPress: (name: (typeof BottomSheets)[number]["name"]) => void;
}

const BottomSheetContext = createContext<BottomSheetContextProps>(
  {} as BottomSheetContextProps,
);

const BottomSheetProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  // Create a ref to the bottom sheet modal so we can programmatically open it
  const bottomSheetModalRef = useRef<BottomSheetModal[]>([]);

  const openBottomSheet = useCallback(
    (name: (typeof BottomSheets)[number]["name"], props?: any) => {
      // Find the index of the bottom sheet we want to open
      const index = BottomSheets.findIndex((sheet) => sheet.name === name);
      // Open the bottom sheet modal
      bottomSheetModalRef.current[index]?.present(props);
    },
    [],
  );

  const handleCloseModalPress = useCallback(
    (name: (typeof BottomSheets)[number]["name"]) => {
      // Find the index of the bottom sheet we want to close
      const index = BottomSheets.findIndex((sheet) => sheet.name === name);
      // Close the bottom sheet modal
      bottomSheetModalRef.current[index]?.dismiss();
    },
    [],
  );

  const handleSnapToIndex = useCallback(
    (name: (typeof BottomSheets)[number]["name"], index: number) => {
      // Find the index of the bottom sheet we want to close
      const sheetIndex = BottomSheets.findIndex((sheet) => sheet.name === name);
      // Close the bottom sheet modal
      bottomSheetModalRef.current[sheetIndex]?.snapToIndex(index);
    },
    [],
  );

  const handleSnapToPosition = useCallback(
    (name: (typeof BottomSheets)[number]["name"], position: string) => {
      // Find the index of the bottom sheet we want to close
      const sheetIndex = BottomSheets.findIndex((sheet) => sheet.name === name);
      // Close the bottom sheet modal
      bottomSheetModalRef.current[sheetIndex]?.snapToPosition(position);
    },
    [],
  );

  return (
    <BottomSheetContext.Provider
      value={{
        handleSnapToIndex,
        handleSnapToPosition,
        openBottomSheet,
        handleCloseModalPress,
      }}
    >
      {children}
      {BottomSheets.map((sheet, index) => {
        // Create props
        const props = {
          key: sheet.name,
          openBottomSheet: (name: string, props?: any) =>
            openBottomSheet(name, props),
          handleCloseModalPress: () => handleCloseModalPress(sheet.name),
          handleSnapToIndex: (index: number) =>
            handleSnapToIndex(sheet.name, index),
          handleSnapToPosition: (position: string) =>
            handleSnapToPosition(sheet.name, position),
          innerRef: (ref: BottomSheetModal) =>
            (bottomSheetModalRef.current[index] = ref),
        };

        const ComponentToRender = sheet.component as any;

        if (!ComponentToRender) {
          return null;
        }

        return <ComponentToRender {...props} />;
      })}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheets = () => useContext(BottomSheetContext);

export default BottomSheetProvider;
