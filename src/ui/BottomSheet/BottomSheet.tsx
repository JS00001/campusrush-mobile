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
  MAX_HEIGHT_PERCENTAGE?: number;
  disableClose?: boolean;
  innerRef?: React.Ref<BottomSheetModal>;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  MAX_HEIGHT_PERCENTAGE = 0.9,
  disableClose,
  children,
  ...props
}) => {
  const windowHeight = Dimensions.get("window").height;
  const maxDynamicContentSize = windowHeight * MAX_HEIGHT_PERCENTAGE;

  const handleIndicatorStyles = tw.style("bg-gray-500 rounded-full w-14");

  return (
    <BottomSheetModal
      enableDynamicSizing
      ref={props.innerRef}
      enablePanDownToClose={!disableClose}
      backgroundStyle={tw`rounded-3xl`}
      handleIndicatorStyle={handleIndicatorStyles}
      maxDynamicContentSize={maxDynamicContentSize}
      backdropComponent={(props) => {
        const pressBehavior = disableClose ? "none" : "close";
        return <BottomSheetBackdrop {...props} pressBehavior={pressBehavior} />;
      }}
      {...props}
    >
      {children}
    </BottomSheetModal>
  );
};

export default BottomSheet;
