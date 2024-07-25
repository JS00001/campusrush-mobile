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

const BillingTourStep4: React.FC = () => {
  const largeBentoContent: React.ReactNode = <LargeBentoCell />;
  const smallBentoContent: [React.ReactNode, React.ReactNode] = [
    <FirstSmallBentoCell />,
    <SecondSmallBentoCell />,
  ];

  return (
    <Onboarding
      currentStep={4}
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
      largeBentoContent={largeBentoContent}
      smallBentoContent={smallBentoContent}
    />
  );
};

const LargeBentoCell: React.FC = () => {
  const badgeContainerStyles = tw.style(
    "border-[#438CF3] border self-start",
    "rounded-full py-0.5 px-2",
  );

  return (
    <View style={tw`flex-1 p-8 justify-between flex-row items-center`}>
      <View style={tw`flex-1 justify-center`}>
        <View style={badgeContainerStyles}>
          <Text type="custom" style={tw`text-[10px] text-[#438CF3]`}>
            Easy Tracking
          </Text>
        </View>

        <Text type="h2">QR Code Magic.</Text>
        <Text type="h2">Instant PNM Information.</Text>
      </View>

      <Image
        style={tw` h-16 w-16`}
        contentFit="scale-down"
        source={require("@/../assets/onboarding/icons/qr_code.svg")}
      />
    </View>
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
