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
import RegistrationStep1View from "@/views/register/Step1";

const RegistrationStep1Screen = () => {
  return (
    <Layout gap={18} keyboardAvoiding>
      <Layout.Header
        hasBackButton
        title="Register"
        subtitle="Please provide your chapters information"
      />

      <RegistrationStep1View />
    </Layout>
  );
};

export default RegistrationStep1Screen;
