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

import { Image } from "expo-image";

import tw from "@/lib/tailwind";
import Onboarding from "@/components/Onboarding";

const BillingTourStep5: React.FC = () => {
  const smallBentoContent: [React.ReactNode, React.ReactNode] = [
    <FirstSmallBentoCell />,
    <SecondSmallBentoCell />,
  ];

  return (
    <Onboarding
      currentStep={5}
      themeColor="#EA6C04"
      title="Mass Messaging"
      description="Save time and reach all of your PNMs at once. Send personalized messages they receive as regular texts. Target groups like favorites and uncontacted PNMs."
      pages={[
        "BillingTourStep1",
        "BillingTourStep2",
        "BillingTourStep3",
        "BillingTourStep4",
        "BillingTourStep5",
        "BillingTourStep6",
      ]}
      largeBentoSvg={require("@/../assets/onboarding/icons/timer-line.svg")}
      largeBentoContent={["One Click.", "100+ People in the Loop."]}
      smallBentoContent={smallBentoContent}
    />
  );
};

const FirstSmallBentoCell: React.FC = () => {
  return (
    <Image
      contentFit="scale-down"
      style={tw`flex-1 -mb-8`}
      source={require("@/../assets/onboarding/onboarding_5_new_message.svg")}
    />
  );
};

const SecondSmallBentoCell: React.FC = () => {
  return (
    <Image
      contentFit="scale-down"
      style={tw`flex-1 -mb-8`}
      source={require("@/../assets/onboarding/onboarding_5_send_message.svg")}
    />
  );
};

export default BillingTourStep5;
