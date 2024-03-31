/*
 * Created on Sun Mar 24 2024
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

const SwitchScreen = () => {
  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Switch"
        subtitle="A toggleable switch"
      />

      <Layout.Content></Layout.Content>
    </Layout.Root>
  );
};

export default SwitchScreen;
