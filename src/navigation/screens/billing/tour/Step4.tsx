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

const BillingTourStep4: React.FC = () => {
  const smallBentoContent: [React.ReactNode, React.ReactNode] = [
    <FirstSmallBentoCell />,
    <SecondSmallBentoCell />,
  ];

  return (
    <Onboarding
      currentStep={4}
      themeColor="#438DF3"
      title="Easy Sharing"
      description="Sign-up and get a unique phone number for your organization. PNMs text you directly, and you reply from the app. Share your custom number, QR code, or link to let PNMs add themselves to your contacts."
      pages={[
        "BillingTourStep1",
        "BillingTourStep2",
        "BillingTourStep3",
        "BillingTourStep4",
        "BillingTourStep5",
        "BillingTourStep6",
      ]}
      largeBentoSvg={require("@/../assets/onboarding/icons/qr-code-line.svg")}
      largeBentoContent={["QR Code Magic.", "Instant PNM Information."]}
      smallBentoContent={smallBentoContent}
    />
  );
};

const FirstSmallBentoCell: React.FC = () => {
  return (
    <Image
      contentFit="scale-down"
      style={tw`flex-1 -mb-8`}
      source={require("@/../assets/onboarding/onboarding_4_phone_number.svg")}
    />
  );
};

const SecondSmallBentoCell: React.FC = () => {
  return (
    <Image
      contentFit="scale-down"
      style={tw`flex-1 -mt-6`}
      source={require("@/../assets/onboarding/onboarding_4_add_pnm.svg")}
    />
  );
};

export default BillingTourStep4;
