/*
 * Created on Fri Mar 15 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { Layout } from "@/ui/Layout";

const ConversationScreen = () => {
  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Conversation"
        subtitle="A list item that represents a conversation. Has an unread indicator and a timestamp."
      />

      <Layout.Content></Layout.Content>
    </Layout.Root>
  );
};

export default ConversationScreen;
