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

const BillingTourStep2: React.FC = () => {
  const smallBentoContent: [React.ReactNode, React.ReactNode] = [
    <FirstSmallBentoCell />,
    <SecondSmallBentoCell />,
  ];

  return (
    <Onboarding
      currentStep={2}
      themeColor="#E94256"
      title="PNM Profiles"
      description="Keep track of every PNM with favorites, tags, social media, and more; all in one streamlined profile"
      pages={[
        "BillingTourStep1",
        "BillingTourStep2",
        "BillingTourStep3",
        "BillingTourStep4",
        "BillingTourStep5",
        "BillingTourStep6",
      ]}
      largeBentoSvg={require("@/../assets/onboarding/icons/user-star-line.svg")}
      largeBentoContent={["Profile Perfection.", "All-in-one PNM Hub."]}
      smallBentoContent={smallBentoContent}
    />
  );
};

const FirstSmallBentoCell: React.FC = () => {
  return (
    <Image
      contentFit="scale-down"
      style={tw`flex-1 -mt-6`}
      source={require("@/../assets/onboarding/onboarding_2_pnm_overview.svg")}
    />
  );
};

const SecondSmallBentoCell: React.FC = () => {
  return (
    <Image
      contentFit="scale-down"
      style={tw`flex-1 -mb-6`}
      source={require("@/../assets/onboarding/onboarding_2_pnms.svg")}
    />
  );
};

export default BillingTourStep2;
