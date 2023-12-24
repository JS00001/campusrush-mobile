/*
 * Created on Sun Oct 8 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Text from "@/ui/Text";
import date from "@/lib/util/date";
import tw from "@/lib/tailwind";

interface ConversationProps {
  conversation: Conversation;
}

const Conversation: React.FC<ConversationProps> = ({ conversation }) => {
  // Use the navigation hook to navigate to the chat screen
  const navigation = useNavigation();
  // Get the full name of the PNM
  const fullName = `${conversation.pnm.firstName} ${conversation.pnm.lastName}`;

  // When the conversation is pressed, navigate to the chat screen
  const onPress = () => {
    (navigation.navigate as any)("Chat", {
      pnm: conversation.pnm,
    });
  };

  // Styling
  const containerClasses = tw.style(
    // Default classes
    "bg-slate-100 w-full p-4 rounded-md gap-6",
    // Add justify for timestamp
    "flex-row justify-between items-center",
  );

  const unreadIndicatorClasses = tw.style(
    // Default classes
    "rounded-full bg-blue-600 p-[4px]",
    // If the conversation is read, hide the indicator
    conversation.read && "opacity-0",
  );

  return (
    <TouchableOpacity onPress={onPress} style={containerClasses}>
      <View style={tw`flex-row items-center gap-3 flex-shrink`}>
        {/* Unread indicator */}
        <View style={unreadIndicatorClasses} />

        {/* Title and subtitle */}
        <View>
          <Text variant="body" style={tw`text-primary`}>
            {fullName}
          </Text>

          <Text variant="subtext" style={tw`text-slate-500`} numberOfLines={1}>
            {conversation.lastMessage}
          </Text>
        </View>
      </View>

      {/* Timestamp */}
      <View style={tw`h-full `}>
        <Text style={tw`text-slate-400`} variant="subtext">
          {date.timeAgo(conversation.lastMessageSentAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Conversation;
