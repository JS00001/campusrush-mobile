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

const BillingTourStep6: React.FC = () => {
  const smallBentoContent: [React.ReactNode, React.ReactNode] = [
    <FirstSmallBentoCell />,
    <SecondSmallBentoCell />,
  ];

  return (
    <Onboarding
      currentStep={6}
      themeColor="#31CC50"
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
      largeBentoSvg={require("@/../assets/onboarding/icons/calendar-2-line.svg")}
      largeBentoContent={["RSVPs, Simplified.", "Events, Managed."]}
      smallBentoContent={smallBentoContent}
    />
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
      source={require("@/../assets/onboarding/onboarding_6_send_event.svg")}
    />
  );
};

export default BillingTourStep6;
