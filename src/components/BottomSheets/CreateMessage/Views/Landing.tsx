/*
 * Created on Tue Feb 27 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { View } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import ListItem from "@/ui/ListItem";
import { useModalStore } from "@/store";
import Content from "@/constants/content";
import ListItemLoader from "@/ui/Loaders/ListItem";
import HeadlineLoader from "@/ui/Loaders/Headline";

import { useQonversion } from "@/providers/Qonversion";
import { useGetContacts } from "@/hooks/api/messaging";
import type { UseSheetFlowProps } from "@/hooks/useSheetFlow";

const Landing: React.FC<UseSheetFlowProps> = ({ nextView, handleClose }) => {
  const { isPro } = useQonversion();
  const navigation = useNavigation();

  const openModal = useModalStore((state) => state.openModal);
  const { all, starred, uncontacted, isLoading } = useGetContacts();

  /**
   * Helper function for mass messaging (all uncontacted, all favorites, etc)
   */
  // prettier-ignore
  const onMassMessage = (pnms: PNM[], error: {title: string, message: string}) => {
    // If no PNMs, show error
    if (!pnms.length) {
      Toast.show({
        type: 'error',
        text1: error.title,
        text2: error.message
      })
    }

    // If only one pnm, open their direct message
    else if (pnms.length === 1) {
      (navigation.navigate as any)("Chat", {
        pnm: pnms[0],
      })
    }

    // If multiple, open the new message screen to send a mass message
    else {
      (navigation.navigate as any)("NewMessage", {
        pnms
      })
    }

    handleClose();
  }

  /**
   * When the user presses the direct message button (option 1)
   */
  const onDirectMessagePress = () => {
    nextView();
  };

  /**
   * When the user presses the message all button (option 2)
   */
  const onMessageAllPress = () => {
    onMassMessage(all, Content.newMessage.noPNMs);
  };

  /**
   * When the user presses the message favorites button (option 3)
   */
  const onMessageFavoritesPress = () => {
    if (isPro) {
      onMassMessage(starred, Content.newMessage.noFavoritedPNMs);
      return;
    }

    openModal("info", {
      title: "Upgrade for more",
      subtitle: Content.newMessage.favoritedPNMsUpgrade,
    });

    handleClose();
  };

  /**
   * When the user presses the message uncontacted button (option 4)
   */
  const onMessageUncontactedPress = () => {
    if (isPro) {
      onMassMessage(uncontacted, Content.newMessage.noUncontactedPNMs);
      return;
    }

    openModal("info", {
      title: "Upgrade for more",
      subtitle: Content.newMessage.uncontactedPNMsUpgrade,
    });

    handleClose();
  };

  if (isLoading) return <LoadingState />;

  return (
    <>
      <View style={tw`pb-4`}>
        <Text type="h2">New Message</Text>
        <Text>Start a new message with potential members</Text>
      </View>

      <ListItem
        size="lg"
        title="Direct Message"
        subtitle="Send a message to a PNM"
        icon="chat-private-fill"
        onPress={onDirectMessagePress}
      />
      <ListItem
        size="lg"
        title="Message All"
        subtitle="Send a message to all PNMs"
        icon="chat-voice-fill"
        onPress={onMessageAllPress}
      />
      <ListItem
        size="lg"
        title="Message New PNMS"
        subtitle="Send a message to all PNMs you have not contacted"
        icon="chat-history-fill"
        onPress={onMessageUncontactedPress}
      />
      <ListItem
        size="lg"
        title="Message Favorite PNMS"
        subtitle="Send a message to all PNMs you have favorited"
        icon="star-fill"
        onPress={onMessageFavoritesPress}
      />
    </>
  );
};

const LoadingState = () => {
  return (
    <>
      <HeadlineLoader style={tw`pb-4`} />

      <ListItemLoader size="lg" />
      <ListItemLoader size="lg" />
      <ListItemLoader size="lg" />
      <ListItemLoader size="lg" />
    </>
  );
};

export default Landing;
