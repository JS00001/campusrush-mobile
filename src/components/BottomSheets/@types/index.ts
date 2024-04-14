/*
 * Created on Sun Feb 25 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { BottomSheetModal } from '@gorhom/bottom-sheet';

import BottomSheets from '@/components/BottomSheets';

type BottomSheetName = keyof typeof BottomSheets;

export interface BottomSheetProps {
  innerRef: (ref: BottomSheetModal) => void;
  handleClose: () => void;
  snapToIndex: (index: number) => void;
  snapToPosition: (position: string) => void;
  openBottomSheet: (name: BottomSheetName, props?: any) => void;
}
