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

import { Layout } from "@/ui/Layout";
import ChaptersView from "@/views/admin";

const Chapters = () => {
  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Chapters"
        subtitle="View all registered chapters"
      />

      <Layout.Content gap={12}>
        <ChaptersView />
      </Layout.Content>
    </Layout.Root>
  );
};

export default Chapters;
