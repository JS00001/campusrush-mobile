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
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import Stepper from "@/ui/Stepper";
import ButtonGroup from "@/ui/ButtonGroup";
import { usePreferences } from "@/providers/Preferences";

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
    <SafeAreaView style={tw`flex-1 bg-slate-50 px-6 pt-12`}>
      <View style={tw`flex-1 gap-10`}>
        <OnboardingBento
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
        <Stepper activeStep={currentStep} stepCount={pages.length} />
        <OnboardingButtons pages={pages} currentStep={currentStep} />
      </View>
    </SafeAreaView>
  );
};

interface OnboardingButtonsProps {
  pages: string[];
  currentStep: number;
}

/**
 * OnboardingButtons handles rendering the appropriate amount of buttons
 * based on the current step the user is on.
 */
const OnboardingButtons: React.FC<OnboardingButtonsProps> = ({
  pages,
  currentStep,
}) => {
  const navigation = useNavigation();
  const { updatePreferences } = usePreferences();

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === pages.length;
  const navigate = navigation.navigate as any;
  const primaryText = isLastStep ? "Let's Go!" : "Next";

  const handleNextPress = () => {
    if (isLastStep) {
      navigate("Billing");
      updatePreferences({ onboardingComplete: true });
      return;
    }

    navigate(pages[currentStep]);
  };

  const handleBackPress = () => {
    if (isFirstStep) return;

    navigate(pages[currentStep - 2]);
  };

  if (isFirstStep) {
    return (
      <Button size="sm" color="primary" onPress={handleNextPress}>
        Start Tour
      </Button>
    );
  } else {
    return (
      <ButtonGroup>
        <Button size="sm" color="tertiary" onPress={handleBackPress}>
          Back
        </Button>
        <Button size="sm" color="primary" onPress={handleNextPress}>
          {primaryText}
        </Button>
      </ButtonGroup>
    );
  }
};

interface OnboardingBentoProps {
  currentStep: number;
  largeBentoContent?: React.ReactNode;
  smallBentoContent?: [React.ReactNode, React.ReactNode];
}

/**
 * OnboardingBento handles rendering the large and small bento cells. These will be swapped
 * on every other step. Even numbered steps will have the large bento cell on the top, and odd
 * numbered steps will have the large bento cell on the bottom.
 */
const OnboardingBento: React.FC<OnboardingBentoProps> = ({
  currentStep,
  largeBentoContent,
  smallBentoContent,
}) => {
  // If the current step is even, the large bento cell will be on top
  const isLargeBentoOnTop = currentStep % 2 === 0;

  if (!largeBentoContent || !smallBentoContent) {
    return null;
  }

  if (isLargeBentoOnTop) {
    return (
      <View style={tw`gap-3`}>
        <View style={tw`bg-slate-200 rounded-xl h-40 rounded-xl`}>
          {largeBentoContent}
        </View>

        <View style={tw`gap-3 h-40 flex-row`}>
          {smallBentoContent.map((content, index) => (
            <View key={index} style={tw`bg-slate-200 flex-1 rounded-xl`}>
              {content}
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={tw`gap-3`}>
      <View style={tw`gap-3 h-40 flex-row`}>
        {smallBentoContent.map((content, index) => (
          <View key={index} style={tw`bg-slate-200 flex-1 rounded-xl`}>
            {content}
          </View>
        ))}
      </View>

      <View style={tw`bg-slate-200 rounded-xl h-40 rounded-xl`}>
        {largeBentoContent}
      </View>
    </View>
  );
};

export default Onboarding;
