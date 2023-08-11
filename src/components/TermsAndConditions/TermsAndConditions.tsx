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

import tw from "@/lib/tailwind";
import Hyperlink from "@/ui/Hyperlink";
import Text from "@/ui/Text";
import { View } from "react-native";

interface TermsAndConditionsProps {
  color?: "dark" | "light";
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ color }) => {
  return (
    <>
      <Text style={tw`text-slate-500 mt-8 text-center`}>
        By continuing, you acknowledge and agree to our
      </Text>
      <View style={tw`flex-row justify-center`}>
        <Hyperlink color={color}>Terms and Conditions</Hyperlink>
        <Text style={tw`text-slate-500 text-center`}>&nbsp;and&nbsp;</Text>
        <Hyperlink color={color}>Privacy Policy</Hyperlink>
      </View>
    </>
  );
};

export default TermsAndConditions;
