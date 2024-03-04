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

import Layout from "@/ui_v1/Layout";
import UpdateGeneralView from "@/views/settings/UpdateGeneral";

const UpdateGeneralScreen = () => {
  return (
    <Layout scrollable>
      <Layout.Header
        hasBackButton
        title="General"
        subtitle="Update general information"
      />

      <UpdateGeneralView />
    </Layout>
  );
};

export default UpdateGeneralScreen;
