/*
 * Created on Mon Feb 26 2024
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

import Step1 from "./Views/Step1";
import Step2 from "./Views/Step2";
import Step3 from "./Views/Step3";

import { BottomSheet } from "@/ui_v1/BottomSheet";
import useSheetFlow from "@/hooks/useSheetFlow";
import BottomSheetContainer from "@/ui_v1/BottomSheet/Container";

const CreateEventSheet: React.FC<BottomSheetProps> = ({
  innerRef,
  handleClose,
  handleSnapToIndex,
  handleSnapToPosition,
}) => {
  const views = [Step1, Step2, Step3];

  const sheetFlow = useSheetFlow({
    state: {
      title: undefined,
      description: undefined,
      location: undefined,
      startDate: new Date().getTime().toString(),
      endDate: new Date().getTime().toString(),
    },
    views,
    handleClose,
    handleSnapToIndex,
    handleSnapToPosition,
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

export default CreateEventSheet;
