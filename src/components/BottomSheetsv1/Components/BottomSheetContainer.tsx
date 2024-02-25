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

import tw from "@/lib/tailwind";

import { ScrollViewProps } from "react-native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

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
  const _style = tw.style("p-6", style);

  const _contentContainerStyle = tw.style(
    "gap-y-2 pb-16",
    contentContainerStyle,
  );

  return (
    <BottomSheetScrollView
      style={_style}
      scrollEnabled={!disableScroll}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={_contentContainerStyle}
      {...props}
    >
      {children}
    </BottomSheetScrollView>
  );
};

export default BottomSheetContainer;
