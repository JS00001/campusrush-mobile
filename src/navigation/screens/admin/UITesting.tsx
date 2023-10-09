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
import Message from "@/ui/Message";

interface UITestingProps {
  navigation: NativeStackNavigationProp<any>;
}

const UITesting: React.FC<UITestingProps> = ({ navigation }) => {
  return (
    <Layout scrollable gap={12}>
      <Layout.Header
        hasBackButton
        title="UI Testing"
        subtitle="Test new UI in a sandbox environment"
      />

      <Message
        content="This is a sent message"
        sent
        createdAt="2023-09-17T00:00:00.000Z"
      />

      <Message
        content="This is a received message"
        sent={false}
        createdAt="2023-09-17T00:00:00.000Z"
      />

      <Message
        content="This is a longer sent message that should wrap to the next line"
        sent
      />
      <Message
        sent
        content="This is an even longer message that should wrap to the next line, and then some. This should be a very long paragraph but should still be readable"
        createdAt="2023-09-17T00:00:00.000Z"
      />
    </Layout>
  );
};

export default UITesting;
