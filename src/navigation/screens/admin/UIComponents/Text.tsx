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

const TextScreen = () => {
  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Text"
        subtitle="Simple text with different styles"
      />

      <Layout.Content></Layout.Content>
    </Layout.Root>
  );
};

export default TextScreen;
