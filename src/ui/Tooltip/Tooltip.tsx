/*
 * Created on Tue Nov 07 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import RNTooltip from "react-native-walkthrough-tooltip";
import type { TooltipProps as RNTooltipProps } from "react-native-walkthrough-tooltip";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface TooltipProps extends RNTooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  onClose,
  isVisible,
  ...props
}) => {
  const content = <Text style={tw`text-white`}>{text}</Text>;

  return (
    <RNTooltip
      disableShadow
      placement="top"
      onClose={onClose}
      content={content}
      isVisible={isVisible}
      backgroundColor="transparent"
      contentStyle={tw`rounded-lg p-2 bg-gray-800 max-w-64 items-center`}
      {...props}
    >
      {children}
    </RNTooltip>
  );
};

export default Tooltip;
