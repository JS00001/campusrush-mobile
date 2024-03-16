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

const IconLabelScreen = () => {
  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Icon Label"
        subtitle="An icon badge with a title and subtitle next to it"
      />

      <Layout.Content></Layout.Content>
    </Layout.Root>
  );
};

export default IconLabelScreen;
