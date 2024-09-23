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

import type { IMessage } from "@/types";
import type { TimestampedData } from "@/lib/util/group";

import MessageImage from "./MessageImage";
import MessageContent from "./MessageContent";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import WebsitePreview from "@/ui/WebsitePreview";

interface MessageBubbleProps extends ViewProps {
  message: TimestampedData<IMessage>;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
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

  const dateStyles = tw.style("text-gray-500 py-4", "self-center");
  const errorStyles = tw.style("text-red pt-2", messagePositioning);
  const timestampStyles = tw.style("text-gray-500 pt-2", messagePositioning);

  return (
    <View>
      {/* If we want to show the date, show it */}
      {createdOn && (
        <Text type="p4" style={dateStyles}>
          {createdOn}
        </Text>
      )}

      {/* The message bubble itself */}

      <View style={tw.style(`gap-y-2`, messagePositioning)}>
        {/* Link Previews */}
        {hyperlinkUrl && (
          <WebsitePreview url={hyperlinkUrl} style={messagePositioning} />
        )}

        {/* Image Attachments */}
        {message.attachments.map((url, i) => (
          <MessageImage key={i} url={url} error={message.error} />
        ))}

        {/* Message Bubble */}
        {!hyperlinkUrl && message.content && (
          <MessageContent message={message} error={message.error} />
        )}
      </View>

      {/* The messages created time */}
      {createdAt && (
        <Text type="p4" style={timestampStyles}>
          {createdTime}
        </Text>
      )}
    </View>
  );
};

export default MessageBubble;
