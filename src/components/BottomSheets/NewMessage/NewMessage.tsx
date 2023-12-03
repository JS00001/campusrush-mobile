/*
 * Created on Tue Oct 17 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import Toast from "react-native-toast-message";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { NewMessageScreens } from "./types";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import ActionCard from "@/ui/ActionCard";
import Content from "@/constants/content";
import useContacts from "@/hooks/messaging/useContacts";
import { useAuth } from "@/providers/Auth";
import useModalsStore from "@/state/modals";

interface NewMessageProps {
  handleCloseModalPress: () => void;
  setScreen: (screen: NewMessageScreens) => void;
}

const NewMessage: React.FC<NewMessageProps> = ({
  handleCloseModalPress,
  setScreen,
}) => {
  const { isPro } = useAuth();
  const openModal = useModalsStore((state) => state.openModal);
  // Navigation hook to navigate to new message screen
  const navigation = useNavigation();
  // Custom hook to get contacts
  const { isLoading, uncontactedPnms, allPnms, favoritedPnms } = useContacts();

  // When the user presses the direct message button
  const onMessagePress = () => {
    setScreen(NewMessageScreens.DirectMessage);
  };

  // Handle the user pressing any mass message button
  const handleMassMessage = (
    pnms: PNM[],
    errorMessage: { title: string; message: string },
  ) => {
    // If there are no PNMs, show an error toast
    if (pnms.length === 0) {
      Toast.show({
        type: "error",
        text1: errorMessage.title,
        text2: errorMessage.message,
      });
      // and close the bottom sheet modal
      handleCloseModalPress();
      return;
    }

    // Otherwise, close the bottom sheet modal
    handleCloseModalPress();

    // If there is only one PNM, open the chat rather than the new message screen
    if (pnms.length === 1) {
      (navigation.navigate as any)("Chat", {
        pnm: pnms[0],
      });

      return;
    }

    // and pass the PNMs to the new message screen
    (navigation.navigate as any)("NewMessage", {
      pnms,
    });
  };

  const onMessageAllPress = () => {
    handleMassMessage(allPnms, Content.newMessage.noPNMs);
  };

  const onMessageFavoritePress = () => {
    if (isPro) {
      handleMassMessage(favoritedPnms, Content.newMessage.noFavoritedPNMs);
      return;
    }

    openModal({
      name: "UPGRADE",
      props: {
        message: Content.newMessage.favoritedPNMsUpgrade,
      },
    });

    handleCloseModalPress();
  };

  const onMessageNewMembersPress = () => {
    if (isPro) {
      handleMassMessage(uncontactedPnms, Content.newMessage.noUncontactedPNMs);
      return;
    }

    openModal({
      name: "UPGRADE",
      props: {
        message: Content.newMessage.uncontactedPNMsUpgrade,
      },
    });

    handleCloseModalPress();
  };

  return (
    <ScrollView style={tw`p-6`} contentContainerStyle={tw`gap-y-4`}>
      <View>
        <Text variant="title">New Message</Text>
        <Text variant="body">Start a new message with potential members</Text>
      </View>

      <ActionCard
        title="Direct Message"
        subtitle="Send a message to a PNM"
        icon="ri-chat-private-fill"
        loading={isLoading}
        onPress={onMessagePress}
      />
      <ActionCard
        title="Message All"
        subtitle="Send a message to all PNMs"
        icon="ri-chat-voice-fill"
        loading={isLoading}
        onPress={onMessageAllPress}
      />
      <ActionCard
        enforceProPlan
        title="Message New PNMS"
        subtitle="Send a message to all PNMs you have not contacted"
        icon="ri-chat-history-fill"
        loading={isLoading}
        onPress={onMessageNewMembersPress}
      />
      <ActionCard
        enforceProPlan
        title="Message Favorite PNMS"
        subtitle="Send a message to all PNMs you have favorited"
        icon="ri-star-fill"
        loading={isLoading}
        onPress={onMessageFavoritePress}
      />
    </ScrollView>
  );
};

export default NewMessage;
