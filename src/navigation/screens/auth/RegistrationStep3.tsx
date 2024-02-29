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
import RegistrationStep3View from "@/views/register/Step3";

const RegistrationStep3Screen: React.FC = () => {
  return (
    <Layout scrollable keyboardAvoiding gap={18}>
      <Layout.Header
        hasBackButton
        title="Register"
        subtitle="Choose a secure password"
      />

      <RegistrationStep3View />
    </Layout>
  );
};

export default RegistrationStep3Screen;
