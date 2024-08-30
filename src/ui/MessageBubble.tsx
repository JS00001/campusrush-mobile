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

import { Image } from "expo-image";
import { View, ViewProps } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import WebsitePreview from "@/ui/WebsitePreview";

interface MessageBubbleProps extends ViewProps {
  sent: boolean;
  date?: string;
  content?: string;
  attachments?: string[];
  createdAt?: string;
  style?: any;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  content,
  sent,
  date,
  attachments,
  createdAt,
  style,
  ...props
}) => {
  // Check if the content is exclusively a link with NO other text
  const isHyperlink = content?.match(/^https?:\/\/\S+$/);
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

  const imageContainerShadow = tw.style({
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  });

  const imageStyles = tw.style(
    "rounded-lg max-w-5/6 max-h-64",
    sent && "self-end",
    !sent && "self-start",
    {
      width: "100%",
      aspectRatio: 1,
    },
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
      <View style={tw`gap-y-2`}>
        {/* If we have a link, JUST send the link preview */}
        {hyperlinkUrl && (
          <WebsitePreview url={hyperlinkUrl} style={messagePositioning} />
        )}

        {/* If there are attachments, show them as images */}
        {attachments?.map((attachment, i) => (
          <View key={i} style={imageContainerShadow}>
            <Image source={{ uri: attachment }} style={imageStyles} />
          </View>
        ))}

        {/* If no link, and there is content just send the normal bubble (blue/gray) */}
        {!hyperlinkUrl && content && (
          <View style={containerStyles} {...props}>
            <Text style={textStyles}>{content}</Text>
          </View>
        )}
      </View>

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
