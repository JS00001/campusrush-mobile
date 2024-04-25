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

import type { BottomSheetProps } from "../@types";

import QrCode from "./Views/QrCode";
import Landing from "./Views/Landing";
import ManualStep1 from "./Views/ManualStep1";
import ManualStep3 from "./Views/ManualStep3";
import ManualStep2 from "./Views/ManualStep2";

import { BottomSheet } from "@/ui/BottomSheet";
import useSheetFlow from "@/hooks/useSheetFlow";
import BottomSheetContainer from "@/ui/BottomSheet/Container";

const CreatePnmSheet: React.FC<BottomSheetProps> = ({
  innerRef,
  handleClose,
  snapToIndex,
  snapToPosition,
}) => {
  const views = [Landing, ManualStep1, ManualStep2, ManualStep3, QrCode];

  const sheetFlow = useSheetFlow({
    state: {
      firstName: undefined,
      lastName: undefined,
      phoneNumber: undefined,
      instagram: undefined,
      snapchat: undefined,
    },
    views,
    handleClose,
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

export default CreatePnmSheet;
