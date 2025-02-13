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

import type { BottomSheetProps, SheetData } from "../@types";

import Landing from "./Views/Landing";
import ManageBilling from "./Views/ManageBilling";
import SendNotification from "./Views/SendNotification";

import { BottomSheet } from "@/ui/BottomSheet";
import useSheetFlow from "@/hooks/useSheetFlow";
import BottomSheetContainer from "@/ui/BottomSheet/Container";

const ChapterSheet: React.FC<BottomSheetProps> = ({
  innerRef,
  close,
  snapToIndex,
  snapToPosition,
}) => {
  const views = [Landing, ManageBilling, SendNotification];

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
      onChange={sheetFlow.onBottomSheetChange}
      children={(props?: SheetData<"CHAPTER">) => {
        const chapterId = props!.data.chapterId;

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
