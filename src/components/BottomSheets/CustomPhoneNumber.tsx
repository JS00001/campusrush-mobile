/*
 * Created on Sun Sep 10 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { View } from "react-native";

import type { BottomSheetProps } from "./@types";

import Text from "@/ui/Text";
import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";
import { BottomSheet } from "@/ui/BottomSheet";
import BottomSheetContainer from "@/ui/BottomSheet/Container";

const CustomPhoneNumberSheet: React.FC<BottomSheetProps> = ({ innerRef }) => {
  return (
    <BottomSheet
      innerRef={innerRef}
      children={() => {
        const badgeContainerStyles = tw.style(
          "flex-row items-center gap-2",
          "rounded-full px-4 py-1.5 bg-blue-50",
        );

        return (
          <BottomSheetContainer
            contentContainerStyle={tw`items-center gap-y-4`}
          >
            <View style={badgeContainerStyles}>
              <Icon
                size={16}
                name="sparkling-fill"
                color={tw.color("blue-500")}
              />
              <Text type="p2" style={tw`text-blue-500`}>
                Share this number with PNMs!
              </Text>
            </View>

            <View style={tw`gap-y-1`}>
              <Text type="h1" style={tw`text-center text-[28px]`}>
                Chapter Phone Number
              </Text>
              <Text style={tw`text-center`}>
                This is your chapter's custom phone number.
              </Text>
            </View>

            <Step step={1}>
              All texts to this number will show up in the app under 'Messages.'
            </Step>
            <Step step={2}>
              New numbers that text you will automatically be added as PNMs.
            </Step>
            <Step step={3}>
              You can manage all your contacts right from the app.
            </Step>
            <Step step={4}>
              Any message you send from the app will be sent to the PNMs phone
              number, from your chapter's custom phone number.
            </Step>
          </BottomSheetContainer>
        );
      }}
    />
  );
};

interface StepProps {
  step: number;
  children: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ step, children }) => {
  const containerStyles = tw.style(
    "w-full flex-row items-start gap-4",
    "p-4 rounded-xl bg-slate-100",
  );

  const stepContainerStyles = tw.style(
    "items-center justify-center",
    "w-10 h-10 rounded-full bg-slate-200",
  );

  return (
    <View style={containerStyles}>
      <View style={stepContainerStyles}>
        <Text type="h1" style={tw`text-[26px]`}>
          {step}
        </Text>
      </View>
      <Text type="p2" style={tw`shrink`}>
        {children}
      </Text>
    </View>
  );
};

export default CustomPhoneNumberSheet;
