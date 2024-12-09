/*
 * Created on Mon Dec 09 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import type { BottomSheetProps } from "../@types";

import Purchase from "./Views/Purchase";
import Success from "./Views/Success";

import { BottomSheet } from "@/ui/BottomSheet";
import useSheetFlow from "@/hooks/useSheetFlow";
import BottomSheetContainer from "@/ui/BottomSheet/Container";

const PurchasePhoneNumberSheet: React.FC<BottomSheetProps> = ({
  innerRef,
  close,
  snapToIndex,
  snapToPosition,
}) => {
  const views = [Purchase, Success];

  const sheetFlow = useSheetFlow({
    state: {},
    views,
    close,
    snapToIndex,
    snapToPosition,
  });

  const CurrentView = sheetFlow.currentView;

  return (
    <BottomSheet
      innerRef={innerRef}
      disableClose={!sheetFlow.currentViewIndex}
      onChange={sheetFlow.onBottomSheetChange}
    >
      <BottomSheetContainer>
        <CurrentView {...sheetFlow.props} />
      </BottomSheetContainer>
    </BottomSheet>
  );
};

export default PurchasePhoneNumberSheet;
