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
import { Pressable, View, ViewProps } from "react-native";

import type { TimestampedMessage } from "@/lib/messages";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import { useImageZoomStore } from "@/store";
import WebsitePreview from "@/ui/WebsitePreview";

interface MessageBubbleProps extends ViewProps {
  message: TimestampedMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, ...props }) => {
  const { setImage } = useImageZoomStore();

  // Check if the content is exclusively a link with NO other text
  const isHyperlink = message.content?.match(/^https?:\/\/\S+$/);
  const hyperlinkUrl = isHyperlink ? isHyperlink[0] : null;

  const createdAt = message.showTimestamp ? message.createdAt : undefined;
  const createdOn = message.showDate ? message.date : undefined;

  const createdDate = new Date(createdAt ?? "");
  const createdTime = createdDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const messagePositioning = tw.style(
    message.sent && "self-end",
    !message.sent && "self-start",
  );

  const bubbleStyles = tw.style(
    "rounded-xl p-2.5 max-w-5/6",
    message.sent && "bg-blue-600",
    !message.sent && "bg-gray-100",
    messagePositioning,
  );

  const bubbleTextContentStyles = tw.style(
    "text-base",
    message.sent && "text-white",
    !message.sent && "text-black",
  );

  const imageContainerShadow = tw.style(messagePositioning, {
    borderRadius: 12,
    backgroundColor: "#fff",
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  });

  const imageStyles = tw.style("w-full max-h-64 rounded-xl", {
    aspectRatio: 1,
  });

  const timestampStyles = tw.style("text-gray-500 pt-2", messagePositioning);

  const dateStyles = tw.style("text-gray-500 py-4", "self-center");

  return (
    <View>
      {/* If we want to show the date, show it */}
      {createdOn && (
        <Text type="p4" style={dateStyles}>
          {createdOn}
        </Text>
      )}

      {/* The message content (url, image, reaction, bubble) */}
      <View style={tw`gap-y-2`}>
        {/* Link Previews */}
        {hyperlinkUrl && (
          <WebsitePreview url={hyperlinkUrl} style={messagePositioning} />
        )}

        {/* Image Attachments */}
        {message.attachments?.map((attachment, i) => {
          const onPress = () => setImage(attachment);
          return (
            <Pressable key={i} style={imageContainerShadow} onPress={onPress}>
              <Image source={{ uri: attachment }} style={imageStyles} />
            </Pressable>
          );
        })}

        {/* Message Bubble */}
        {!hyperlinkUrl && message.content && (
          <View style={bubbleStyles} {...props}>
            <Text style={bubbleTextContentStyles}>{message.content}</Text>
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
