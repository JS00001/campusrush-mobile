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
import RegistrationStep3View from "@/views/register/Step3";

const RegistrationStep3Screen: React.FC = () => {
  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Register"
        subtitle="Choose a secure password"
      />

      <Layout.Content scrollable keyboardAvoiding gap={12}>
        <RegistrationStep3View />
      </Layout.Content>
    </Layout.Root>
  );
};

export default RegistrationStep3Screen;
