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
  const posthog = usePosthog();
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

      posthog.capture("ONBOARDING_COMPLETE", {
        fromPage: pages[currentStep - 1],
      });

      return;
    }

    navigate(pages[currentStep]);
    posthog.capture("ONBOARDING_NEXT_PRESS", {
      from_page: pages[currentStep - 1],
      to_page: pages[currentStep],
    });
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

export default OnboardingButtons;
