/*
 * Created on Sun Sep 17 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Layout from "@/ui/Layout";

import Header from "@/ui/Header";

import {
  CardEventLoader,
  DefaultEventLoader,
  AttachmentEventLoader,
} from "@/ui/Event/Loaders";
import { View } from "react-native";
import tw from "@/lib/tailwind";
import { ConversationLoader } from "@/ui/Conversation/Loaders";
import {
  ActionCardLgLoader,
  ActionCardMdLoader,
  ActionCardSmLoader,
} from "@/ui/ActionCard/Loaders";
import { ListItemLoader } from "@/ui/ListItem/Loading";

interface UITestingProps {
  navigation: NativeStackNavigationProp<any>;
}

const UITesting: React.FC<UITestingProps> = ({ navigation }) => {
  return (
    <Layout gap={12}>
      <Layout.CustomHeader>
        <Header hasBackButton hasMenuButton title="Admin" />
      </Layout.CustomHeader>

      {/* <View style={tw`w-full flex-row gap-5`}>
        <ActionCardSmLoader />
        <ActionCardSmLoader />
      </View>

      <View style={tw`w-full flex-row gap-5`}>
        <ActionCardMdLoader />
        <ActionCardMdLoader />
      </View>



      <View style={tw`h-32 w-full`}>
        <ActionCardLgLoader />
      </View> */}

      {/* 
      <View style={tw`h-48 w-full`}>
        <DefaultEventLoader />
      </View> */}

      {/* <View style={tw`h-48 w-full`}>
        <AttachmentEventLoader />
      </View> */}

      <View style={tw`h-32 w-full`}>
        <ListItemLoader />
      </View>
    </Layout>
  );
};

export default UITesting;
