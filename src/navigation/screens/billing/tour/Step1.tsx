/*
 * Created on Mon Jul 22 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import Onboarding from "@/components/Onboarding";

const BillingTourStep1: React.FC = () => {
  return (
    <Onboarding
      currentStep={1}
      themeColor="#0056D2"
      title="Welcome"
      description="Let's dive into how our platform makes recruitment management a breeze. Discover why we are the top choice for seamless, efficient, and effective recruitment."
      pages={[
        "BillingTourStep1",
        "BillingTourStep2",
        "BillingTourStep3",
        "BillingTourStep4",
        "BillingTourStep5",
        "BillingTourStep6",
      ]}
    />
  );
};

export default BillingTourStep1;
