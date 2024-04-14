/*
 * Created on Sun Apr 14 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { createContext, useCallback, useContext, useRef } from "react";

import BottomSheets from "@/components/BottomSheets";

type BottomSheetName = keyof typeof BottomSheets;

interface BottomSheetContextProps {
  /* Open a bottom sheet  from the list of registered bottom sheets */
  openBottomSheet: (name: BottomSheetName, props?: any) => void;

  /* Snap the bottom sheet to a specific index */
  snapToIndex: (name: BottomSheetName, i: number) => void;

  /* Snap the bottom sheet to a specific position */
  snapToPosition: (name: BottomSheetName, pos: string) => void;

  /* Close the bottom sheet */
  closeBottomSheet: (name: BottomSheetName) => void;
}

const BottomSheetContext = createContext<BottomSheetContextProps>(
  {} as BottomSheetContextProps,
);

const BottomSheetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const bottomSheetRefs = useRef<BottomSheetModal[]>([]);

  /**
   * Open a bottom sheet from the list of registered bottom sheets
   */
  const openBottomSheet = useCallback((name: BottomSheetName, props?: any) => {
    const index = Object.keys(BottomSheets).indexOf(name);
    const ref = bottomSheetRefs.current[index];

    ref.present(props);
  }, []);

  /**
   * Snap a specific bottom sheet to a specific index
   */
  const snapToIndex = useCallback((name: BottomSheetName, i: number) => {
    const index = Object.keys(BottomSheets).indexOf(name);
    const ref = bottomSheetRefs.current[index];

    ref.snapToIndex(i);
  }, []);

  /**
   * Snap a specific bottom sheet to a specific position
   */
  const snapToPosition = useCallback((name: BottomSheetName, pos: string) => {
    const index = Object.keys(BottomSheets).indexOf(name);
    const ref = bottomSheetRefs.current[index];

    ref.snapToPosition(pos);
  }, []);

  /**
   * Close a specific bottom sheet
   */
  const closeBottomSheet = useCallback((name: BottomSheetName) => {
    const index = Object.keys(BottomSheets).indexOf(name);
    const ref = bottomSheetRefs.current[index];

    ref.dismiss();
  }, []);

  return (
    <BottomSheetContext.Provider
      value={{
        openBottomSheet,
        snapToIndex,
        snapToPosition,
        closeBottomSheet,
      }}
    >
      {children}

      {/* Render each bottom sheet (closed) */}
      {Object.keys(BottomSheets).map((key, index) => {
        const name: BottomSheetName = key as BottomSheetName;
        const BottomSheet = BottomSheets[name];

        const props = {
          key: name,
          openBottomSheet,
          handleClose: () => closeBottomSheet(name),
          snapToIndex: (i: number) => snapToIndex(name, i),
          snapToPosition: (pos: string) => snapToPosition(name, pos),
          innerRef: (ref: BottomSheetModal) => {
            return (bottomSheetRefs.current[index] = ref);
          },
        };

        if (!BottomSheet) return null;

        return <BottomSheet {...props} />;
      })}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => useContext(BottomSheetContext);

export default BottomSheetProvider;
