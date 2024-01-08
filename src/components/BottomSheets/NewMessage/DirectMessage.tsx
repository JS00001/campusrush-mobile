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

import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { NewMessageScreens } from "./types";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import TextInput from "@/ui/TextInput";
import RecentPnms from "@/components/RecentPnms";
import useContacts from "@/hooks/messaging/useContacts";

interface DirectMessageProps {
  handleCloseModalPress?: () => void;
  handleSnapToPosition?: (position: string) => void;
  setScreen?: (screen: NewMessageScreens) => void;
}

const DirectMessage: React.FC<DirectMessageProps> = ({
  handleCloseModalPress,
  handleSnapToPosition,
}) => {
  // Navigation hook to navigate to new message screen
  const navigation = useNavigation();
  // Custom hook to get contacts
  const {
    searchQuery,
    isLoading,
    filteredPnms,
    directMessageHeader,
    setSearchQuery,
  } = useContacts();

  const onPnmPress = (pnm: PNM) => {
    // Close the bottom sheet modal
    handleCloseModalPress?.();
    // and navigate to the new message screen
    (navigation.navigate as any)("Chat", {
      pnm: pnm,
    });
  };

  return (
    <View style={tw`gap-y-4 flex-1`}>
      <View>
        <Text variant="title">Begin Typing</Text>
        <Text variant="body">Search for a PNM to message</Text>
      </View>

      <TextInput
        autoCorrect={false}
        icon="ri-search-line"
        variant="alternate"
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFocus={() => {
          handleSnapToPosition?.("95%");
        }}
      />

      <View style={tw`gap-y-3 flex-1`}>
        <Text variant="text">{directMessageHeader}</Text>
        <RecentPnms
          pnms={filteredPnms}
          loading={isLoading}
          onPress={onPnmPress}
        />
      </View>
    </View>
  );
};

export default DirectMessage;
