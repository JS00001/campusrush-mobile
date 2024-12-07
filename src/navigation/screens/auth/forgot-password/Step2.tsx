/*
 * Created on Wed Aug 14 2024
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
import ForgotPasswordStep2View from "@/views/forgot-password/Step2";

const ForgotPasswordStep2Screen = () => {
  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Forgot Password"
        subtitle="We sent a password reset code to your email. Enter it below along with your new password"
      />

      <Layout.Content scrollable keyboardAvoiding gap={12}>
        <ForgotPasswordStep2View />
      </Layout.Content>
    </Layout.Root>
  );
};

export default ForgotPasswordStep2Screen;
