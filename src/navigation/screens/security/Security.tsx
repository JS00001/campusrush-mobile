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
import SecurityView from "@/views/settings/Security";

const SecurityScreen: React.FC = () => {
  return (
    <Layout.Root>
      <Layout.Header
        title="Security"
        subtitle="Manage your password, and view active account sessions"
      />

      <Layout.Content
        gap={12}
        scrollable
        contentContainerStyle={tw`items-start`}
      >
        <SecurityView />
      </Layout.Content>
    </Layout.Root>
  );
};

export default SecurityScreen;
