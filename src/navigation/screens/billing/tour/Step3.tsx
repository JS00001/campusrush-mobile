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

const BillingTourStep3: React.FC = () => {
  const largeBentoContent: React.ReactNode = <LargeBentoCell />;
  const smallBentoContent: [React.ReactNode, React.ReactNode] = [
    <FirstSmallBentoCell />,
    <SecondSmallBentoCell />,
  ];

  return (
    <Onboarding
      currentStep={3}
      title="Messaging, Simplified"
      description="Manage all of your messages in one place. Send messages that PNMs receive as regular texts - no downloads required."
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
    <View style={tw`flex-1 flex-row px-10`}>
      {/* Text Column */}
      <View style={tw`h-full justify-center gap-y-1`}>
        {/* Row One */}
        <View style={tw`flex-row items-center gap-2`}>
          <View style={tw`bg-blue-600 rounded-lg px-2 py-0.5`}>
            <Text type="h2" style={tw`text-white`}>
              PNMs
            </Text>
          </View>
          <Text type="h2" style={tw`text-navy-50`}>
            Text...
          </Text>
        </View>

        {/* Row Two */}
        <Text type="h2" style={tw`text-navy-50`}>
          We Handle the Rest.
        </Text>
      </View>

      {/* Messaging Icon */}
      <Image
        style={tw`flex-1 -mr-10 mb-2`}
        contentFit="scale-down"
        source={require("@/../assets/onboarding/icons/messaging.svg")}
      />
    </View>
  );
};

const FirstSmallBentoCell: React.FC = () => {
  return (
    <View style={tw`flex-1`}>
      <Text
        type="custom"
        style={"font-bold text-center text-xs py-2 text-navy-50"}
      >
        Your Phone
      </Text>
      <Image
        style={tw`flex-1`}
        contentFit="scale-down"
        source={require("@/../assets/onboarding/onboarding_3_messaging_app.svg")}
      />
    </View>
  );
};

const SecondSmallBentoCell: React.FC = () => {
  return (
    <View style={tw`flex-1`}>
      <Text
        type="custom"
        style={tw`font-bold text-center text-xs py-2 text-navy-50`}
      >
        PNM's Phone
      </Text>
      <Image
        style={tw`flex-1`}
        contentFit="scale-down"
        source={require("@/../assets/onboarding/onboarding_3_messaging_native.svg")}
      />
    </View>
  );
};

export default BillingTourStep3;
