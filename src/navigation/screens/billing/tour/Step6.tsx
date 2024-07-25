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

const BillingTourStep6: React.FC = () => {
  const largeBentoContent: React.ReactNode = <LargeBentoCell />;
  const smallBentoContent: [React.ReactNode, React.ReactNode] = [
    <FirstSmallBentoCell />,
    <SecondSmallBentoCell />,
  ];

  return (
    <Onboarding
      currentStep={6}
      title="Plan Events"
      description="Plan, share, and manage your rush events. Send event details and RSVP links to PNMs to keep track of attendance."
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
    "border-[#18C839] border self-start",
    "rounded-full py-0.5 px-2",
  );

  return (
    <View style={tw`flex-1 p-8 justify-between flex-row items-center`}>
      <View style={tw`flex-1 justify-center`}>
        <View style={badgeContainerStyles}>
          <Text type="custom" style={tw`text-[10px] text-[#18C839]`}>
            Seamless Planning
          </Text>
        </View>

        <Text type="h2">RSVPs, Simplified.</Text>
        <Text type="h2">Events, Managed.</Text>
      </View>

      <Image
        style={tw`h-32 w-32 mt-6 shadow-xl overflow-visible`}
        contentFit="none"
        source={require("@/../assets/onboarding/icons/event.svg")}
      />
    </View>
  );
};

const FirstSmallBentoCell: React.FC = () => {
  return (
    <Image
      contentFit="scale-down"
      style={tw`flex-1 -mb-8`}
      source={require("@/../assets/onboarding/onboarding_6_events.svg")}
    />
  );
};

const SecondSmallBentoCell: React.FC = () => {
  return (
    <Image
      contentFit="scale-down"
      style={tw`flex-1 -mt-6`}
      source={require("@/../assets/onboarding/onboarding_6_events.svg")}
    />
  );
};

export default BillingTourStep6;
