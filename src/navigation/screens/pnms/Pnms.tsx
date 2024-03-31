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

import PnmsView from "@/views/Pnms";
import { Layout } from "@/ui/Layout";
import tw from "@/lib/tailwind";

const PnmsScreen = () => {
  return (
    <Layout.Root>
      <Layout.Header
        title="PNMs"
        subtitle="View and manage all potential new members"
      />

      <Layout.Content gap={8} contentContainerStyle={tw`pb-0`}>
        <PnmsView />
      </Layout.Content>
    </Layout.Root>
  );
};

export default PnmsScreen;
