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

import tw from "@/lib/tailwind";
import { View } from "react-native";

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
const OnboardingBentoGrid: React.FC<OnboardingBentoProps> = ({
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
        <View
          style={tw`bg-slate-200 rounded-xl h-40 rounded-xl overflow-hidden`}
        >
          {largeBentoContent}
        </View>

        <View style={tw`gap-3 h-40 flex-row overflow-hidden`}>
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

export default OnboardingBentoGrid;
