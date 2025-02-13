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
import { useUser } from "@/providers/User";
import VerificationView from "@/views/Verification";

const VerificationScreen = () => {
  const { user } = useUser();

  return (
    <Layout.Root>
      <Layout.Header
        title="Verification"
        subtitle={`We have sent a verification code sent to ${user.email}. Enter it below.`}
      />

      <Layout.Content scrollable gap={18}>
        <VerificationView />
      </Layout.Content>
    </Layout.Root>
  );
};

export default VerificationScreen;
