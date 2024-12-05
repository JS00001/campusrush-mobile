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
import ForgotPasswordStep1View from "@/views/forgot-password/Step1";

const ForgotPasswordStep1Screen = () => {
  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Forgot Password"
        subtitle="Enter your email, we will send you a code to reset your password"
      />

      <Layout.Content scrollable keyboardAvoiding gap={12}>
        <ForgotPasswordStep1View />
      </Layout.Content>
    </Layout.Root>
  );
};

export default ForgotPasswordStep1Screen;
