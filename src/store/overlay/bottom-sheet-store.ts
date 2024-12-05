/*
 * Created on Wed Dec 04 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { create } from 'zustand';
import * as Haptic from 'expo-haptics';

import type {
  IndividualSheetName,
  IndividualSheetProps,
} from '@/components/BottomSheets/@types';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

type SheetProps<T extends IndividualSheetName> = IndividualSheetProps[T];

type IBottomSheetState = {
  bottomSheetRefs: {
    name: IndividualSheetName;
    ref: BottomSheetModal;
  }[];
};

interface IBottomSheetStore extends IBottomSheetState {
  /** Clear the store */
  clear: () => void;
  /** Close a bottom sheet */
  close: (name: IndividualSheetName) => void;
  /** Open a bottom sheet */
  open: <T extends IndividualSheetName>(name: T, prop?: SheetProps<T>) => void;
  /** Snap a bottom sheet to a specific index */
  snapToIndex: (name: IndividualSheetName, i: number) => void;
  /** Snap a bottom sheet to a specific position */
  snapToPosition: (name: IndividualSheetName, pos: string) => void;
  /** Register a bottom sheet */
  register: (name: IndividualSheetName, ref: BottomSheetModal) => void;
}

export const useBottomSheetStore = create<IBottomSheetStore>((set, get) => {
  const initialState: IBottomSheetState = {
    bottomSheetRefs: [],
  };

  /**
   * Opens a bottom sheet
   */
  const open = <T extends IndividualSheetName>(
    name: T,
    prop?: SheetProps<T>,
  ) => {
    const sheet = get().bottomSheetRefs.find((ref) => ref.name === name);

    if (sheet?.ref) {
      Haptic.selectionAsync();
      sheet.ref.present(prop);
    }
  };

  /**
   * Closes a bottom sheet
   */
  const close = (name: IndividualSheetName) => {
    const sheet = get().bottomSheetRefs.find((ref) => ref.name === name);

    if (sheet?.ref) {
      sheet.ref.dismiss();
    }
  };

  /**
   * Snaps a bottom sheet to a specific index
   */
  const snapToIndex = (name: IndividualSheetName, i: number) => {
    const sheet = get().bottomSheetRefs.find((ref) => ref.name === name);

    if (sheet?.ref) {
      sheet.ref.snapToIndex(i);
    }
  };

  /**
   * Snaps a bottom sheet to a specific position
   */
  const snapToPosition = (name: IndividualSheetName, pos: string) => {
    const sheet = get().bottomSheetRefs.find((ref) => ref.name === name);

    if (sheet?.ref) {
      sheet.ref.snapToPosition(pos);
    }
  };

  /**
   * Registers a bottom sheet
   */
  const register = (name: IndividualSheetName, ref: BottomSheetModal) => {
    set((state) => {
      return {
        ...state,
        bottomSheetRefs: [...state.bottomSheetRefs, { name, ref }],
      };
    });
  };

  /**
   * Clears the store
   */
  const clear = () => {
    return set(initialState);
  };

  return {
    ...initialState,
    open,
    close,
    snapToIndex,
    snapToPosition,
    register,
    clear,
  };
});
