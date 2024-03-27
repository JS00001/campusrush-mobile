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

// hi, i love you. you are the besty boyfriend that i could ask for.
// you are so sexy and its not in a sex way either. i mean yes sex way sometimes but not always.
// you will be a great husband and father one day. i love the future that we have planned but i
// also always enjoy the present with you. you are so smart, kind, and caring.
// ###daddy ###i love you with my fingers, nose, and toes <3.

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
