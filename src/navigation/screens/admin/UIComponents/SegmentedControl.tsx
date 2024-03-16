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

const SegmentedControlScreen = () => {
  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Segmented Control"
        subtitle="Alternative form of tabs for navigating between two or more screens"
      />

      <Layout.Content></Layout.Content>
    </Layout.Root>
  );
};

export default SegmentedControlScreen;
