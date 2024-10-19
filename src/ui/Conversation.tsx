/*
 * Created on Fri Mar 08 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";

import type { IConversation, IPNM } from "@/types";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import date from "@/lib/util/date";

interface ConversationProps extends TouchableOpacityProps {
  conversation: IConversation;
  style?: any;
}

const Conversation: React.FC<ConversationProps> = ({
  conversation,
  style,
  ...props
}) => {
  const label = props["ph-label"] || "conversation";
  const navigation = useNavigation();

  const containerStyles = tw.style(
    "bg-gray-100 w-full p-4 rounded-xl gap-6",
    "flex-row items-center justify-between",
    style,
  );

  const unreadIndicatorStyles = tw.style(
    "rounded-full bg-blue-800 shadow-sm p-1",
    // If conversation is read, hide the indicator
    conversation.read && "opacity-0",
  );

  const onPress = () => {
    navigation.navigate("Conversation", {
      screen: "Chat",
      params: {
        pnm: conversation.pnm as IPNM,
      },
    });
  };

  return (
    <TouchableOpacity
      ph-label={label}
      style={containerStyles}
      onPress={onPress}
      {...props}
    >
      <View style={tw`flex-row items-center gap-3 flex-shrink`}>
        <View style={unreadIndicatorStyles} />

        <View>
          <Text style={tw`text-primary`}>{conversation.pnm.displayName}</Text>
          <Text type="p4" numberOfLines={1}>
            {conversation.lastMessage}
          </Text>
        </View>
      </View>

      <View style={tw`h-full`}>
        <Text type="p4">{date.timeAgo(conversation.lastMessageSentAt)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Conversation;
