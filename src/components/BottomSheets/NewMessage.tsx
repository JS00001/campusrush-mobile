/*
 * Created on Sun Sep 10 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useMemo } from "react";
import { Pressable, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import ActionCard from "@/ui/ActionCard";

interface NewMessageProps {
  innerRef: React.RefObject<any>;
  handleCloseModalPress: () => void;
}

const NewMessage: React.FC<NewMessageProps> = ({
  innerRef,
  handleCloseModalPress,
}) => {
  // Memoized snap points (When the bottom sheet modal is open)
  const snapPoints = useMemo(() => ["65%"], []);

  return (
    <BottomSheetModal
      ref={innerRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={() => (
        <Pressable
          style={tw`h-full w-full absolute bg-black opacity-20`}
          onPress={handleCloseModalPress}
        />
      )}
    >
      <Layout scrollable contentContainerStyle={tw`items-start`}>
        <View>
          <Text variant="title">New Message</Text>
          <Text variant="body" style={tw`text-slate-600`}>
            Start a new message with potential members
          </Text>
        </View>
        <ActionCard
          title="Direct Message"
          subtitle="Start a message with a single user from your contacts"
          icon="ri-chat-private-fill"
        />
        <ActionCard
          title="Message All"
          subtitle="Send a message to all users in your contacts"
          icon="ri-chat-voice-fill"
        />
        <ActionCard
          title="Message New Members"
          subtitle="Send a message to all users who you have not contacted"
          icon="ri-chat-history-fill"
        />
      </Layout>
    </BottomSheetModal>
  );
};

export default NewMessage;
