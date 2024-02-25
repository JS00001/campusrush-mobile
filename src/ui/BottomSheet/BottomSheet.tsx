/*
 * Created on Sun Dec 24 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import React from "react";
import { Dimensions } from "react-native";
import { BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import BottomSheetBackdrop from "./Backdrop";

import tw from "@/lib/tailwind";

interface BottomSheetProps extends BottomSheetModalProps {
  innerRef?: React.Ref<BottomSheetModalMethods>;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ children, ...props }) => {
  const MAX_HEIGHT_PERCENTAGE = 0.9;
  const windowHeight = Dimensions.get("window").height;
  const maxDynamicContentSize = windowHeight * MAX_HEIGHT_PERCENTAGE;

  return (
    <BottomSheetModal
      enableDynamicSizing
      ref={props.innerRef}
      maxDynamicContentSize={maxDynamicContentSize}
      backgroundStyle={tw`rounded-3xl`}
      handleIndicatorStyle={tw`bg-slate-500 rounded-full w-14`}
      backdropComponent={BottomSheetBackdrop}
      {...props}
    >
      {children}
    </BottomSheetModal>
  );
};

export default BottomSheet;
