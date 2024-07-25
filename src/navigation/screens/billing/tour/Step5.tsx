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

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Onboarding from "@/components/Onboarding";

const BillingTourStep5: React.FC = () => {
  const largeBentoContent: React.ReactNode = <LargeBentoCell />;
  const smallBentoContent: [React.ReactNode, React.ReactNode] = [
    <FirstSmallBentoCell />,
    <SecondSmallBentoCell />,
  ];

  return (
    <Onboarding
      currentStep={5}
      title="Mass Messaging"
      description="Reach all of your PNMs at once. Send personalized messages they receive as regular texts. Target groups like favorites and uncontacted PNMs."
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
  const badgeContainerStyles = tw.style(
    "border-[#EA6C04] border self-start",
    "rounded-full py-0.5 px-2",
  );

  return (
    <View style={tw`flex-1 p-8 justify-between flex-row items-center`}>
      <View style={tw`flex-1 justify-center`}>
        <View style={badgeContainerStyles}>
          <Text type="custom" style={tw`text-[10px] text-[#EA6C04]`}>
            Save Time
          </Text>
        </View>

        <Text type="h2">One Click. </Text>
        <Text type="h2">100+ People in the Loop.</Text>
      </View>

      <Image
        style={tw` h-16 w-16`}
        contentFit="scale-down"
        source={require("@/../assets/onboarding/icons/timer.svg")}
      />
    </View>
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
