/*
 * Created on Tue Feb 27 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { BottomSheetProps } from "../@types";

import Landing from "./Views/Landing";

import { BottomSheet } from "@/ui/BottomSheet";
import useSheetFlow from "@/hooks/useSheetFlow";
import BottomSheetContainer from "@/ui/BottomSheet/Container";

export const CreateMessageSheet: React.FC<BottomSheetProps> = ({
  innerRef,
  close,
  snapToIndex,
  snapToPosition,
}) => {
  const views = [Landing];

  const sheetFlow = useSheetFlow({
    state: {},
    views,
    close,
    snapToIndex,
    snapToPosition,
  });

  const CurrentView = sheetFlow.currentView;

  return (
    <BottomSheet innerRef={innerRef} onChange={sheetFlow.onBottomSheetChange}>
      <BottomSheetContainer>
        <CurrentView {...sheetFlow.props} />
      </BottomSheetContainer>
    </BottomSheet>
  );
};

export default CreateMessageSheet;
