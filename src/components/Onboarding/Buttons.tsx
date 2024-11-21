/*
 * Created on Thu Jul 25 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { useNavigation } from "@react-navigation/native";

import Button from "@/ui/Button";
import ButtonGroup from "@/ui/ButtonGroup";
import usePosthog from "@/hooks/usePosthog";
import { usePreferences } from "@/providers/Preferences";
import { BillingStackHook, BillingStackParams } from "@/navigation/@types";

interface OnboardingButtonsProps {
  currentStep: number;
  pages: (keyof BillingStackParams)[];
}

/**
 * OnboardingButtons handles rendering the appropriate amount of buttons
 * based on the current step the user is on.
 */
const OnboardingButtons: React.FC<OnboardingButtonsProps> = ({
  pages,
  currentStep,
}) => {
  const posthog = usePosthog();
  const { updatePreferences } = usePreferences();
  const navigation = useNavigation<BillingStackHook>();

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === pages.length;
  const primaryText = isLastStep ? "Let's Go!" : "Next";

  const handleNextPress = () => {
    if (isLastStep) {
      navigation.navigate("Billing");
      updatePreferences({ onboardingComplete: true });

      posthog.capture("onboarding_complete", {
        fromPage: pages[currentStep - 1],
      });

      return;
    }

    navigation.navigate(pages[currentStep]);
    posthog.capture("onboarding_next_pressed", {
      from_page: pages[currentStep - 1],
      to_page: pages[currentStep],
    });
  };

  const handleBackPress = () => {
    if (isFirstStep) return;

    navigation.navigate(pages[currentStep - 2]);
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

export default OnboardingButtons;
