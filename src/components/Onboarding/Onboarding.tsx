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
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";

import OnboardingStepper from "./Stepper";
import OnboardingButtons from "./Buttons";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import { BillingStackParams } from "@/navigation/@types";

interface OnboardingProps {
  /** The title to be displayed below the grid */
  title: string;
  /** The description to be displayed below the title */
  description: string;
  /** A list of the onboarding pages in order  */
  pages: (keyof BillingStackParams)[];
  /** The current step the user is on (starting at index 1) */
  currentStep: number;
  /** The color of the theme for the slide */
  themeColor: string;

  /** The svg to be used for the large bento */
  largeBentoSvg?: string;
  /** The component to be rendered in the large bento cell */
  largeBentoContent?: [string, string];
  /** The two components to be rendered in the small bento cells */
  smallBentoContent?: [React.ReactNode, React.ReactNode];
}

const Onboarding: React.FC<OnboardingProps> = ({
  title,
  description,
  pages,
  currentStep,
  themeColor,
  largeBentoSvg,
  largeBentoContent,
  smallBentoContent,
}) => {
  const largeBentoCellStyles = tw.style(
    "bg-slate-200 h-40 rounded-xl overflow-hidden",
    "flex-row items-center justify-between p-8",
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-slate-50 px-4 pt-20`}>
      {/* Bento grid and title */}
      <View style={tw`flex-1 gap-10`}>
        <View style={tw`gap-3`}>
          {currentStep === 1 && (
            <Image
              contentFit="scale-down"
              style={tw`h-[370px]`}
              source={require("@/../assets/onboarding/onboarding_1_homepage.svg")}
            />
          )}

          {/* Large bento square */}
          {largeBentoContent && largeBentoSvg && (
            <View style={largeBentoCellStyles}>
              <View>
                {largeBentoContent.map((content, index) => (
                  <Text key={index} type="h2" style={tw`text-primary`}>
                    {content}
                  </Text>
                ))}
              </View>

              <Image style={tw`w-16 h-16`} source={largeBentoSvg} />
            </View>
          )}

          {/* Small bento squares */}
          {smallBentoContent && (
            <View style={tw`gap-3 h-40 flex-row overflow-hidden`}>
              {smallBentoContent.map((content, index) => (
                <View key={index} style={tw`bg-slate-200 flex-1 rounded-xl`}>
                  {content}
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={tw`items-center gap-y-2`}>
          <Text type="h1" style={{ color: themeColor }}>
            {title}
          </Text>
          <Text type="p1" style={tw`text-center text-primary`}>
            {description}
          </Text>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={tw`gap-y-4 items-center`}>
        <OnboardingButtons pages={pages} currentStep={currentStep} />
        <OnboardingStepper currentStep={currentStep} stepCount={pages.length} />
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
