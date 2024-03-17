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

import { Layout } from "@/ui/Layout";
import MessagesView from "@/views/Messages";

const MessagesScreen = () => {
  return (
    <Layout.Root>
      <Layout.Header
        title="Messages"
        subtitle="Message potential new members"
      />

      <Layout.Content gap={8}>
        <MessagesView />
      </Layout.Content>
    </Layout.Root>
  );
};

export default MessagesScreen;
