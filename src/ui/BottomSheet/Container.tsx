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

import { ScrollViewProps } from "react-native";
import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";

import tw from "@/lib/tailwind";

interface BottomSheetContainerProps extends ScrollViewProps {
  style?: any;
  contentContainerStyle?: any;
  disableScroll?: boolean;
}

const BottomSheetContainer: React.FC<BottomSheetContainerProps> = ({
  style,
  contentContainerStyle,
  disableScroll,
  children,
  ...props
}) => {
  const containerStyles = tw.style("p-6", style);

  const contentContainerStyles = tw.style(
    "gap-y-2 pb-16",
    contentContainerStyle,
  );

  if (disableScroll) {
    return (
      <BottomSheetView {...props} style={containerStyles}>
        {children}
      </BottomSheetView>
    );
  }

  return (
    <BottomSheetScrollView
      {...props}
      style={containerStyles}
      scrollEnabled={!disableScroll}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={contentContainerStyles}
    >
      {children}
    </BottomSheetScrollView>
  );
};

export default BottomSheetContainer;
