/*
 * Created on Thu Sep 21 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import Layout from "@/ui/Layout";

interface AddManualProps {}

const AddManual: React.FC<AddManualProps> = () => {
  return (
    <Layout scrollable gap={12}>
      <Layout.Header
        title="Add PNM"
        subtitle="Input the PNMs information below"
      />
    </Layout>
  );
};

export default AddManual;
