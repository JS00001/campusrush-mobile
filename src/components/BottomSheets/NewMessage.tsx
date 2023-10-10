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
import Toast from "react-native-toast-message";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { Pressable, ScrollView, View } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import ActionCard from "@/ui/ActionCard";
import useContacts from "@/hooks/messaging/useContacts";

interface NewMessageProps {
  innerRef: React.RefObject<any>;
  handleCloseModalPress: () => void;
  handleSnapToPosition: (position: string) => void;
}

const NewMessage: React.FC<NewMessageProps> = ({
  innerRef,
  handleCloseModalPress,
  handleSnapToPosition,
}) => {
  // Memoized snap points (When the bottom sheet modal is open)
  const snapPoints = useMemo(() => ["65%"], []);
  // Navigation hook to navigate to new message screen
  const navigation = useNavigation();
  // Custom hook to get contacts
  const { isLoading, refetch, uncontactedPnms, allPnms } = useContacts();

  // When the user presses the direct message button
  const onMessagePress = () => {
    handleSnapToPosition("90%");
  };

  // When the user presses the message all button
  const onMessageAllPress = () => {
    // If there are no PNMs, show an error toast
    if (allPnms.length === 0) {
      Toast.show({
        type: "error",
        text1: "No PNMs",
        text2: "You have no PNMs to message",
      });
      // and close the bottom sheet modal
      handleCloseModalPress();
      return;
    }

    // Otherwise, close the bottom sheet modal
    handleCloseModalPress();

    // and pass the PNMs to the new message screen
    (navigation.navigate as any)("NewMessage", {
      pnms: allPnms,
    });
  };

  // When the user presses the message new members button
  const onMessageNewMembersPress = () => {
    // If there are no uncontacted PNMs, show an error toast
    if (uncontactedPnms.length === 0) {
      Toast.show({
        type: "error",
        text1: "No PNMs",
        text2: "You have sent messages to all PNMs",
      });
      // and close the bottom sheet modal
      handleCloseModalPress();
      return;
    }

    // Otherwise, close the bottom sheet modal
    handleCloseModalPress();

    // and pass the PNMs to the new message screen
    (navigation.navigate as any)("NewMessage", {
      pnms: uncontactedPnms,
    });
  };

  // When the bottom sheet modal is open
  const onBottomSheetOpen = (index: number) => {
    // If the bottom sheet modal is open
    if (index === 0) {
      // Refetch the contacts
      refetch();
    }
  };

  return (
    <BottomSheetModal
      ref={innerRef}
      index={0}
      snapPoints={snapPoints}
      // On open callback
      onChange={onBottomSheetOpen}
      backdropComponent={() => (
        <Pressable
          style={tw`h-full w-full absolute bg-black opacity-20`}
          onPress={handleCloseModalPress}
        />
      )}
    >
      <ScrollView style={tw`p-6`} contentContainerStyle={tw`gap-y-4`}>
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
          onPress={onMessagePress}
        />
        <ActionCard
          title="Message New Members"
          subtitle="Send a message to all PNMs you have not contacted"
          icon="ri-chat-history-fill"
          loading={isLoading}
          onPress={onMessageNewMembersPress}
        />
      </ScrollView>
    </BottomSheetModal>
  );
};

export default NewMessage;
