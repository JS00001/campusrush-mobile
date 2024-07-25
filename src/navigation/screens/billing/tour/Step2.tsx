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
import { View } from "react-native";

import tw from "@/lib/tailwind";
import Text from "@/ui/Text";
import Onboarding from "@/components/Onboarding";

const BillingTourStep2: React.FC = () => {
  const largeBentoContent: React.ReactNode = <LargeBentoCell />;
  const smallBentoContent: [React.ReactNode, React.ReactNode] = [
    <FirstSmallBentoCell />,
    <SecondSmallBentoCell />,
  ];

  return (
    <Onboarding
      currentStep={2}
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
      largeBentoContent={largeBentoContent}
      smallBentoContent={smallBentoContent}
    />
  );
};

const LargeBentoCell: React.FC = () => {
  return (
    <View style={tw`flex-1`}>
      <Image
        style={tw`w-22 h-22 right-0 absolute`}
        source={require("@/../assets/onboarding/icons/instagram.svg")}
      />
      <Image
        style={tw`w-28 h-22 bottom-0 right-4 absolute`}
        source={require("@/../assets/onboarding/icons/snapchat.svg")}
      />

      <View style={tw`flex-1 px-10 justify-center`}>
        <Text type="h1">Profile</Text>
        <Text type="h1">Perfection.</Text>
      </View>
    </View>
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
