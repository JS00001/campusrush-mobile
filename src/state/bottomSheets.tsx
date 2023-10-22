/*
 * Created on Sun Oct 22 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { create } from "zustand";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import BottomSheetComponents from "@/components/BottomSheets";

const BottomSheets = [
  { name: "ABOUT", component: BottomSheetComponents.About },
  { name: "ADD_PNM", component: BottomSheetComponents.AddPnm },
  { name: "HELP", component: BottomSheetComponents.Help },
  { name: "NEW_MESSAGE", component: BottomSheetComponents.NewMessage },
  {
    name: "TERMS_AND_CONDITIONS",
    component: BottomSheetComponents.TermsAndConditions,
  },
  {
    name: "PRIVACY_POLICY",
    component: BottomSheetComponents.PrivacyPolicy,
  },
];

export interface BottomSheetsState {
  bottomSheetModalRef: Array<BottomSheetModal | null>;

  snapToIndex: (
    name: (typeof BottomSheets)[number]["name"],
    index: number,
  ) => void;
  snapToPosition: (
    name: (typeof BottomSheets)[number]["name"],
    position: string,
  ) => void;
  closeModal: (name: (typeof BottomSheets)[number]["name"]) => void;
  presentModal: (name: (typeof BottomSheets)[number]["name"]) => void;
}

const useBottomSheetsStore = create<BottomSheetsState>()((set) => ({
  /**
   * The list of bottom sheet modals
   */
  bottomSheetModalRef: Array(BottomSheets.length).fill(null),
  /**
   * Closes a bottom sheet modal
   */
  closeModal: (name: (typeof BottomSheets)[number]["name"]) => {
    const index = BottomSheets.findIndex((sheet) => sheet.name === name);

    set((state) => {
      const newState = { ...state };
      newState.bottomSheetModalRef[index]?.close();
      return newState;
    });
  },
  /**
   * Presents a bottom sheet modal
   */
  presentModal: (name: (typeof BottomSheets)[number]["name"]) => {
    const index = BottomSheets.findIndex((sheet) => sheet.name === name);

    set((state) => {
      const newState = { ...state };
      newState.bottomSheetModalRef[index]?.present();
      return newState;
    });
  },
  /**
   * Snap to a specific snapPoint index
   */
  snapToIndex: (name: (typeof BottomSheets)[number]["name"], index: number) => {
    const i = BottomSheets.findIndex((sheet) => sheet.name === name);

    set((state) => {
      const newState = { ...state };
      newState.bottomSheetModalRef[i]?.snapToIndex(index);
      return newState;
    });
  },
  /**
   * Snap to a specific snapPoint position
   */
  snapToPosition: (
    name: (typeof BottomSheets)[number]["name"],
    position: string,
  ) => {
    const i = BottomSheets.findIndex((sheet) => sheet.name === name);

    set((state) => {
      const newState = { ...state };
      newState.bottomSheetModalRef[i]?.snapToPosition(position);
      return newState;
    });
  },
}));

export default useBottomSheetsStore;
