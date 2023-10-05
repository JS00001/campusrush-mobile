/*
 * Created on Wed Oct 4 2023
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

interface ChatProps {
  navigation: NativeStackNavigationProp<any>;
}

const Chat: React.FC<ChatProps> = ({ navigation }) => {
  return (
    <>
      <Layout scrollable gap={8}></Layout>
    </>
  );
};

export default Chat;
