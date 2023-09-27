/*
 * Created on Mon Aug 07 2023
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
import { MenuView } from "@react-native-menu/menu";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import TextInput from "@/ui/TextInput";
import IconButton from "@/ui/IconButton";
import ActionButton from "@/ui/ActionButton";
import { useBottomSheets } from "@/providers/BottomSheet";

interface MessagesProps {
  navigation: NativeStackNavigationProp<any>;
}

const Messages: React.FC<MessagesProps> = ({ navigation }) => {
  const { handlePresentModalPress } = useBottomSheets();

  const onNewChatPress = () => {
    handlePresentModalPress("NEW_MESSAGE");
  };

  return (
    <>
      <ActionButton icon="ri-add-line" onPress={onNewChatPress} />
      <Layout scrollable gap={8}>
        <Layout.Header
          title="Messages"
          subtitle="Message potential new members"
        />

        <View style={tw`flex-row w-full gap-x-2`}>
          <TextInput
            icon="ri-search-line"
            variant="alternate"
            placeholder="Search Messages"
            containerStyle={tw`flex-shrink`}
          />

          <MenuView
            title="Filter By"
            actions={[
              {
                id: "remove-filters",
                title: "No Filters",
                image: "xmark",
              },
              {
                id: "filter-by-unread-messages",
                title: "Unread Messages",
                image: "message",
              },
              {
                id: "filter-by-alphabetical",
                title: "Alphabetical",
                image: "textformat.abc",
              },
              {
                id: "filter-by-received-bid",
                title: "Received Bid",
                image: "person.badge.plus",
              },
            ]}
          >
            <IconButton icon="ri-filter-3-fill" style={tw`flex-grow`} />
          </MenuView>
        </View>
      </Layout>
    </>
  );
};

export default Messages;
