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

import { ScrollViewProps } from "react-native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import tw from "@/lib/tailwind";

interface BottomSheetContainerProps extends ScrollViewProps {
  style?: any;
  contentContainerStyle?: any;
  children: React.ReactNode;
  disableScroll?: boolean;
}

const BottomSheetContainer: React.FC<BottomSheetContainerProps> = ({
  style,
  contentContainerStyle,
  disableScroll,
  children,
  ...props
}) => {
  const containerClasses = tw.style("p-6", style);

  const contentContainerClasses = tw.style(
    "gap-y-2 pb-16",
    contentContainerStyle,
  );

  return (
    <BottomSheetScrollView
      style={containerClasses}
      scrollEnabled={!disableScroll}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={contentContainerClasses}
      {...props}
    >
      {children}
    </BottomSheetScrollView>
  );
};

export default BottomSheetContainer;
