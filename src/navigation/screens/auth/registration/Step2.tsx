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
import RegistrationStep2View from "@/views/register/Step2";

const RegistrationStep2Screen = () => {
  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Register"
        subtitle="Please provide your personal details"
      />

      <Layout.Content scrollable keyboardAvoiding gap={12}>
        <RegistrationStep2View />
      </Layout.Content>
    </Layout.Root>
  );
};

export default RegistrationStep2Screen;
