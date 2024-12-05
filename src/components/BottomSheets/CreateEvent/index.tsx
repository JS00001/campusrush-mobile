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

import { BottomSheet } from "@/ui/BottomSheet";
import useSheetFlow from "@/hooks/useSheetFlow";
import BottomSheetContainer from "@/ui/BottomSheet/Container";

export interface CreateEventState {
  title?: string;
  description?: string;
  location?: string;
  startDate: string;
  endDate: string;
}

const CreateEventSheet: React.FC<BottomSheetProps> = ({
  innerRef,
  close,
  snapToIndex,
  snapToPosition,
}) => {
  const views = [Step1, Step2, Step3];

  const sheetFlow = useSheetFlow({
    state: {
      title: undefined,
      description: undefined,
      location: undefined,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    },
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

export default CreateEventSheet;
