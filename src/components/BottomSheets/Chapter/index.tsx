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

import Landing from "./Views/Landing";
import ManageBilling from "./Views/ManageBilling";

import { BottomSheet } from "@/ui/BottomSheet";
import useSheetFlow from "@/hooks/useSheetFlow";
import BottomSheetContainer from "@/ui/BottomSheet/Container";

const ChapterSheet: React.FC<BottomSheetProps> = ({
  innerRef,
  handleClose,
  snapToIndex,
  snapToPosition,
}) => {
  const views = [Landing, ManageBilling];

  const sheetFlow = useSheetFlow({
    state: {},
    views,
    handleClose,
    snapToIndex,
    snapToPosition,
  });

  const CurrentView = sheetFlow.currentView;

  return (
    <BottomSheet
      innerRef={innerRef}
      onChange={sheetFlow.onBottomSheetChange}
      children={(data) => {
        const chapterId = data?.data.chapterId as string;

        return (
          <BottomSheetContainer>
            <CurrentView {...sheetFlow.props} chapterId={chapterId} />
          </BottomSheetContainer>
        );
      }}
    ></BottomSheet>
  );
};

export default ChapterSheet;
