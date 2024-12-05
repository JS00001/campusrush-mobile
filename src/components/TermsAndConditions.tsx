/*
 * Created on Thu Aug 10 2023
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

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Hyperlink from "@/ui/Hyperlink";
import { useBottomSheetStore } from "@/store";

interface TermsAndConditionsProps {
  color?: "primary" | "secondary";
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ color }) => {
  const bottomSheetStore = useBottomSheetStore();

  const onTermsOfServicePress = () => {
    bottomSheetStore.open("TERMS_OF_SERVICE");
  };

  const onPrivacyPolicyPress = () => {
    bottomSheetStore.open("PRIVACY_POLICY");
  };

  return (
    <View>
      <Text style={tw`mt-8 text-center`}>By continuing, you agree to our</Text>
      <View style={tw`flex-row justify-center`}>
        <Hyperlink color={color} onPress={onTermsOfServicePress}>
          Terms of Service
        </Hyperlink>
        <Text style={tw`text-center`}>&nbsp;and&nbsp;</Text>
        <Hyperlink color={color} onPress={onPrivacyPolicyPress}>
          Privacy Policy
        </Hyperlink>
      </View>
    </View>
  );
};

export default TermsAndConditions;
