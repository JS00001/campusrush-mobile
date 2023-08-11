/*
 * Created on Tue Aug 08 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useCallback, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const useBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const open = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const close = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return {
    bottomSheetRef,
    open,
    close,
  };
};

export default useBottomSheet;
