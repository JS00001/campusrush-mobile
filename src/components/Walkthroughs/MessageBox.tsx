/*
 * Created on Fri Oct 20 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import Tooltip from "react-native-walkthrough-tooltip";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface MessageBoxWalkthroughProps {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

const MessageBoxWalkthrough: React.FC<MessageBoxWalkthroughProps> = ({
  children,
  isVisible,
  onClose,
}) => {
  const content = (
    <Text style={tw`text-white text-center`}>
      Use "@" to view text replacements
    </Text>
  );

  return (
    <Tooltip
      disableShadow
      placement="top"
      onClose={onClose}
      content={content}
      isVisible={isVisible}
      backgroundColor="transparent"
      contentStyle={tw`rounded-lg bg-gray-800 h-10 `}
    >
      {children}
    </Tooltip>
  );
};

export default MessageBoxWalkthrough;
