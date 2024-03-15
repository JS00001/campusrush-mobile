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

import RNTooltip from "react-native-walkthrough-tooltip";
import type { TooltipProps as RNTooltipProps } from "react-native-walkthrough-tooltip";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface TooltipProps extends Omit<RNTooltipProps, "content"> {
  content: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  onClose,
  isVisible,
  ...props
}) => {
  const contentElement = <Text style={tw`text-white`}>{content}</Text>;

  const tooltipStyles = tw.style(
    "rounded-xl p-2 bg-gray-800 max-w-64 items-center",
  );

  return (
    <RNTooltip
      disableShadow
      placement="top"
      onClose={onClose}
      content={contentElement}
      isVisible={isVisible}
      backgroundColor="transparent"
      contentStyle={tooltipStyles}
      {...props}
    >
      {children}
    </RNTooltip>
  );
};

export default Tooltip;
