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

import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import Layout from "@/ui/Layout";
import Text from "@/ui/Text";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "react-native";

interface MessagesProps {
  navigation: NativeStackNavigationProp<any>;
}

const Messages: React.FC<MessagesProps> = ({ navigation }) => {
  const onNewChatPress = () => {
    navigation.navigate("CreateMessage");
  };

  return (
    <Layout scrollable gap={8}>
      <Layout.Header
        title="Messages"
        subtitle="Message potential new members"
      />

      <Button onPress={onNewChatPress}>New Message</Button>
    </Layout>
  );
};

export default Messages;
