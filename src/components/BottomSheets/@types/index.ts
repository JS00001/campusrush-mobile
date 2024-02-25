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

export interface BottomSheetProps {
  innerRef: React.RefObject<BottomSheetModal>;
  handleClose: () => void;
  handleSnapToIndex: (index: number) => void;
  handleSnapToPosition: (position: string) => void;
  openBottomSheet: (name: string, props?: any) => void;
}
