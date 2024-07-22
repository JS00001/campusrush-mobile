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

import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import { useNavigation } from "@react-navigation/native";
import Stepper from "@/ui/Stepper";

interface BillingTourStep1Props {}

const BillingTourStep1: React.FC<BillingTourStep1Props> = () => {
  const navigation = useNavigation();

  const handleNextPress = () => {
    (navigation.navigate as any)("BillingTourStep2");
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-slate-50 px-6 pt-12`}>
      <View style={tw`flex-1 gap-10`}>
        <View style={tw`gap-3`}>
          <View style={tw`gap-3 h-40 flex-row`}>
            <View style={tw`bg-slate-200 flex-1 rounded-xl`}></View>
            <View style={tw`bg-slate-200 flex-1 rounded-xl`}></View>
          </View>

          <View style={tw`gap-3 h-40 flex-row`}>
            <View style={tw`bg-slate-200 flex-1 rounded-xl`}></View>
          </View>
        </View>

        <View style={tw`items-center`}>
          <Text type="h1">Welcome</Text>
          <Text type="p1" style={tw`text-center text-primary`}>
            Subtitle
          </Text>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={tw`gap-y-4 items-center`}>
        <Stepper activeStep={1} stepCount={6} />

        <Button size="sm" color="primary" onPress={handleNextPress}>
          Let's Go!
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default BillingTourStep1;
