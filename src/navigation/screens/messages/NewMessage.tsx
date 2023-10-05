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

interface NewMessageProps {
  navigation: NativeStackNavigationProp<any>;
  route: any;
}

const NewMessage: React.FC<NewMessageProps> = ({ navigation, route }) => {
  const { pnms } = route.params;

  return (
    <>
      <Layout scrollable gap={8}>
        <Layout.ChatHeader pnms={pnms} />
      </Layout>
    </>
  );
};

export default NewMessage;
