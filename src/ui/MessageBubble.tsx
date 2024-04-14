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

import { View, ViewProps } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import CopyAction from "@/ui/CopyAction";
import WebsitePreview from "@/ui/WebsitePreview";

interface MessageBubbleProps extends ViewProps {
  content: string;
  sent: boolean;
  date?: string;
  createdAt?: string;
  style?: any;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  content,
  sent,
  date,
  createdAt,
  style,
  ...props
}) => {
  // Check if the content is exclusively a link with NO other text
  const isHyperlink = content.match(/^https?:\/\/\S+$/);
  const hyperlinkUrl = isHyperlink ? isHyperlink[0] : null;

  const createdDate = new Date(createdAt ?? "");
  const createdTime = createdDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const messagePositioning = tw.style(
    sent && "self-end",
    !sent && "self-start",
  );

  const containerStyles = tw.style(
    "rounded-xl p-2.5 max-w-5/6",
    sent && "bg-blue-600",
    !sent && "bg-gray-100",
    messagePositioning,
    style,
  );

  const textStyles = tw.style(
    "text-base",
    sent && "text-white",
    !sent && "text-black",
  );

  const timestampStyles = tw.style("text-gray-500 pt-2", messagePositioning);

  const dateStyles = tw.style("text-gray-500 py-4", "self-center");

  return (
    <View>
      {/* If a date is provided, show it */}
      {date && (
        <Text type="p4" style={dateStyles}>
          {date}
        </Text>
      )}

      {/* The message bubble/content itself */}
      <CopyAction title="Copy Message" content={content}>
        {/* If we have a link, JUST send the link preview */}
        {hyperlinkUrl && (
          <WebsitePreview url={hyperlinkUrl} style={messagePositioning} />
        )}

        {/* If no link, just send the normal bubble (blue/gray) */}
        {!hyperlinkUrl && (
          <View style={containerStyles} {...props}>
            <Text style={textStyles}>{content}</Text>
          </View>
        )}
      </CopyAction>

      {/* If there is a createdAt time, show it */}
      {createdAt && (
        <Text type="p4" style={timestampStyles}>
          {createdTime}
        </Text>
      )}
    </View>
  );
};

export default MessageBubble;
