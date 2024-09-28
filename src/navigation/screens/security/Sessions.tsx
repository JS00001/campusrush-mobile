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
import { Layout } from "@/ui/Layout";
import SessionsView from "@/views/security/Sessions";

const SessionsScreen: React.FC = () => {
  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Sessions"
        subtitle="All current sessions. Log out of any session to secure your account."
      />

      <Layout.Content gap={8} style={tw`pb-0`}>
        <SessionsView />
      </Layout.Content>
    </Layout.Root>
  );
};

export default SessionsScreen;
