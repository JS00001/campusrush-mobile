/*
 * Created onWed Sep 27 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { View } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Copyable from "../Copyable";

interface MessageProps {
  content: string;
  sent: boolean;
  date?: string;
  createdAt?: string;
}

const Message: React.FC<MessageProps> = ({
  content,
  sent,
  date,
  createdAt,
}) => {
  // Convert the createdAt string to a Date object
  const createdDate = new Date(createdAt ?? "");
  // Extract just the time from the Date object
  const time = createdDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Style the message bubble for a sent message
  const sentMessageClasses = tw.style("bg-blue-600 self-end max-w-5/6");
  // Style the message text for a sent message
  const sentTextClasses = tw.style("text-white");

  // Style the message bubble for a received message
  const receivedMessageClasses = tw.style("bg-slate-100 self-start max-w-4/5");
  // Style the message text for a received message
  const receivedTextClasses = tw.style("text-black");

  // The styling for the message bubble, based on whether the message was sent or received
  const messageClasses = tw.style(
    // Shared styles
    "rounded-xl p-2.5",
    // Conditional styles
    sent ? sentMessageClasses : receivedMessageClasses,
  );

  // The styling for the message text, based on whether the message was sent or received
  const textClasses = tw.style(
    // Shared styles
    "text-base",
    // Conditional styles
    sent ? sentTextClasses : receivedTextClasses,
  );

  // The styling for the message timestamp, based on whether the message was sent or received
  const timestampClasses = tw.style(
    // Shared styles
    "text-gray-500 mt-1",
    // Conditional styles
    sent ? "self-end" : "self-start",
  );

  const dateClasses = tw.style(
    // Shared styles
    "text-gray-500  my-4",
    // Conditional styles
    "self-center",
  );

  return (
    <View>
      {/* Date if provided */}
      {date === undefined ? null : (
        <Text type="p4" style={dateClasses}>
          {date}
        </Text>
      )}

      {/* Message bubble and content */}
      <Copyable title="Copy Message" copyText={content}>
        <View style={messageClasses}>
          <Text style={textClasses}>{content}</Text>
        </View>
      </Copyable>

      {/* Message timestamp if provided */}
      {createdAt === undefined ? null : (
        <Text type="p4" style={timestampClasses}>
          {time}
        </Text>
      )}
    </View>
  );
};

export default Message;
