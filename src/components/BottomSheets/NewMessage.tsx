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
import Toast from "react-native-toast-message";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import ActionCard from "@/ui/ActionCard";
import useContacts from "@/hooks/messaging/useContacts";

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

  const navigation = useNavigation();

  const { isLoading, uncontactedPnms, allPnms } = useContacts();

  const onMessageAllPress = () => {
    if (allPnms.length === 0) {
      Toast.show({
        type: "error",
        text1: "No PNMs",
        text2: "You have no PNMs to message",
      });
      handleCloseModalPress();
      return;
    }

    (navigation.navigate as any)("NewMessage", {
      pnms: allPnms,
    });

    handleCloseModalPress();
  };

  const onMessageNewMembersPress = () => {
    if (uncontactedPnms.length === 0) {
      Toast.show({
        type: "error",
        text1: "No PNMs",
        text2: "You have sent messages to all PNMs",
      });
      handleCloseModalPress();
      return;
    }

    (navigation.navigate as any)("NewMessage", {
      pnms: uncontactedPnms,
    });

    handleCloseModalPress();
  };

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
          title="Message All"
          subtitle="Send a message to all PNMs"
          icon="ri-chat-voice-fill"
          loading={isLoading}
          onPress={onMessageAllPress}
        />
        <ActionCard
          title="Direct Message"
          subtitle="Start a message with a single user"
          icon="ri-chat-private-fill"
          loading={isLoading}
        />
        <ActionCard
          title="Message New Members"
          subtitle="Send a message to all PNMs you have not contacted"
          icon="ri-chat-history-fill"
          loading={isLoading}
          onPress={onMessageNewMembersPress}
        />
      </Layout>
    </BottomSheetModal>
  );
};

export default NewMessage;
