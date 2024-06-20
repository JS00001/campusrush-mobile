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

import type {
  IndividualSheetProps,
  IndividualSheetName,
} from "@/components/BottomSheets/@types";
import BottomSheets from "@/components/BottomSheets";

interface BottomSheetContextProps {
  /* Open a bottom sheet  from the list of registered bottom sheets */
  // prettier-ignore
  openBottomSheet: <T extends IndividualSheetName>(name: T, props?: IndividualSheetProps[T]) => void;

  /* Snap the bottom sheet to a specific index */
  snapToIndex: (name: IndividualSheetName, i: number) => void;

  /* Snap the bottom sheet to a specific position */
  snapToPosition: (name: IndividualSheetName, pos: string) => void;

  /* Close the bottom sheet */
  closeBottomSheet: (name: IndividualSheetName) => void;
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
  // prettier-ignore
  const openBottomSheet = useCallback(<T extends IndividualSheetName>(name: T, props?: IndividualSheetProps[T]) => {
    const index = Object.keys(BottomSheets).indexOf(name);
    const ref = bottomSheetRefs.current[index];

    ref.present(props);
  }, []);

  /**
   * Snap a specific bottom sheet to a specific index
   */
  const snapToIndex = useCallback((name: IndividualSheetName, i: number) => {
    const index = Object.keys(BottomSheets).indexOf(name);
    const ref = bottomSheetRefs.current[index];

    ref.snapToIndex(i);
  }, []);

  /**
   * Snap a specific bottom sheet to a specific position
   */
  const snapToPosition = useCallback(
    (name: IndividualSheetName, pos: string) => {
      const index = Object.keys(BottomSheets).indexOf(name);
      const ref = bottomSheetRefs.current[index];

      ref.snapToPosition(pos);
    },
    [],
  );

  /**
   * Close a specific bottom sheet
   */
  const closeBottomSheet = useCallback((name: IndividualSheetName) => {
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
        const name: IndividualSheetName = key as IndividualSheetName;
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
