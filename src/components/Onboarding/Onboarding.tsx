/*
 * Created on Wed Jul 24 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import OnboardingStepper from "./Stepper";
import OnboardingButtons from "./Buttons";
import OnboardingBentoGrid from "./BentoGrid";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface OnboardingProps {
  /** The title to be displayed below the grid */
  title: string;
  /** The description to be displayed below the title */
  description: string;
  /** A list of the onboarding pages in order  */
  pages: string[];
  /** The current step the user is on (starting at index 1) */
  currentStep: number;
  /** The component to be rendered in the large bento cell */
  largeBentoContent?: React.ReactNode;
  /** The two components to be rendered in the small bento cells */
  smallBentoContent?: [React.ReactNode, React.ReactNode];
}

const Onboarding: React.FC<OnboardingProps> = ({
  title,
  description,
  pages,
  currentStep,
  largeBentoContent,
  smallBentoContent,
}) => {
  return (
    <SafeAreaView style={tw`flex-1 bg-slate-50 px-4 pt-12`}>
      {/* Bento grid and title */}
      <View style={tw`flex-1 gap-10`}>
        <OnboardingBentoGrid
          currentStep={currentStep}
          largeBentoContent={largeBentoContent}
          smallBentoContent={smallBentoContent}
        />

        <View style={tw`items-center gap-y-2`}>
          <Text type="h1">{title}</Text>
          <Text type="p1" style={tw`text-center text-primary`}>
            {description}
          </Text>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={tw`gap-y-4 items-center`}>
        <OnboardingStepper currentStep={currentStep} stepCount={pages.length} />
        <OnboardingButtons pages={pages} currentStep={currentStep} />
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
