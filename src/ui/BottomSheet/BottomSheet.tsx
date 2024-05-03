/*
 * Created on Fri Mar 15 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import React from "react";
import { Dimensions } from "react-native";
import { BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";

import BottomSheetBackdrop from "./Backdrop";

import tw from "@/lib/tailwind";

interface BottomSheetProps extends BottomSheetModalProps {
  innerRef?: React.Ref<BottomSheetModal>;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ children, ...props }) => {
  const MAX_HEIGHT_PERCENTAGE = 0.9;

  const windowHeight = Dimensions.get("window").height;
  const maxDynamicContentSize = windowHeight * MAX_HEIGHT_PERCENTAGE;

  const handleIndicatorStyles = tw.style("bg-slate-500 rounded-full w-14");

  return (
    <BottomSheetModal
      enableDynamicSizing
      ref={props.innerRef}
      backgroundStyle={tw`rounded-3xl`}
      backdropComponent={BottomSheetBackdrop}
      handleIndicatorStyle={handleIndicatorStyles}
      maxDynamicContentSize={maxDynamicContentSize}
      {...props}
    >
      {children}
    </BottomSheetModal>
  );
};

export default BottomSheet;
