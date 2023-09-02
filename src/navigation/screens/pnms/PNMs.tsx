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

import IconButton from "@/ui/IconButton/IconButton";
import Layout from "@/ui/Layout";

const PNMs = () => {
  return (
    <Layout scrollable>
      <Layout.Header
        title="PNMs"
        subtitle="View and manage all potential new members"
      />

      <IconButton icon="ri-filter-3-fill" />
    </Layout>
  );
};

export default PNMs;
