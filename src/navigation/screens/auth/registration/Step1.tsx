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
import RegistrationStep1View from "@/views/register/Step1";

const RegistrationStep1Screen = () => {
  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Register"
        subtitle="Please provide your chapters information"
      />

      <Layout.Content gap={12} keyboardAvoiding>
        <RegistrationStep1View />
      </Layout.Content>
    </Layout.Root>
  );
};

export default RegistrationStep1Screen;
