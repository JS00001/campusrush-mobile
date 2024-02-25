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

import Layout from "@/ui/Layout";
import RegistrationStep2View from "@/views/register/Step2";

const RegistrationStep2Screen = () => {
  return (
    <Layout scrollable keyboardAvoiding gap={18}>
      <Layout.Header
        hasBackButton
        title="Register"
        subtitle="Please provide your personal details"
      />

      <RegistrationStep2View />
    </Layout>
  );
};

export default RegistrationStep2Screen;
