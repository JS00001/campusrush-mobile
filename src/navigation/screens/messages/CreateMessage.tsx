/*
 * Created on Mon Aug 28 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import Layout from "@/ui/Layout";
import ActionCard from "@/ui/ActionCard";

const CreateMessage = () => {
  return (
    <Layout scrollable>
      <Layout.Header
        hasBackButton
        title="New Mesage"
        subtitle="Start a new message with potential members"
      />

      <ActionCard
        title="Direct Message"
        subtitle="Start a message with a single user from your contacts"
        icon="ri-chat-private-fill"
      />
      <ActionCard
        title="Message All"
        subtitle="Send a message to all users in your contacts"
        icon="ri-chat-voice-fill"
      />
      <ActionCard
        title="Message New Members"
        subtitle="Send a message to all users who you have not contacted"
        icon="ri-chat-history-fill"
      />
    </Layout>
  );
};

export default CreateMessage;
