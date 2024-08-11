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
import ChapterView from "@/views/settings/Chapter";

const ChapterScreen: React.FC = () => {
  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Chapter"
        subtitle="Manage your chapter"
      />

      <Layout.Content gap={12} scrollable>
        <ChapterView />
      </Layout.Content>
    </Layout.Root>
  );
};

export default ChapterScreen;
