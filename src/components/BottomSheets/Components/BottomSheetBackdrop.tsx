/*
 * Created on Sat Nov 11 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import {
  BottomSheetBackdrop as RNBottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

const BottomSheetBackdrop: React.FC<BottomSheetBackdropProps> = ({
  ...props
}) => {
  return (
    <RNBottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      enableTouchThrough={true}
      opacity={0.5}
    />
  );
};

export default BottomSheetBackdrop;
