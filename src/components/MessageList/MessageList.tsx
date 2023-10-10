/*
 * Created on Mon Oct 9 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { FlatList } from "react-native-bidirectional-infinite-scroll";

import tw from "@/lib/tailwind";
import Message from "@/ui/Message";

interface MessageListProps {
  messages?: Message[];
  onEndReached: () => Promise<void>;
  onStartReached: () => Promise<void>;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  onEndReached,
  onStartReached,
}) => {
  return (
    <FlatList
      style={tw`w-full -mt-6`}
      contentContainerStyle={tw`gap-y-2 `}
      data={messages}
      inverted
      renderItem={({ item }) => (
        <Message
          key={item._id}
          content={item.content}
          sent={item.sent}
          createdAt={item.createdAt.toString()}
        />
      )}
      onEndReached={onEndReached}
      onStartReached={onStartReached}
      showDefaultLoadingIndicators
      onEndReachedThreshold={0.75}
      onStartReachedThreshold={0.75}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default MessageList;
