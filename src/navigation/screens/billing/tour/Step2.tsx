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
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import Stepper from "@/ui/Stepper";
import ButtonGroup from "@/ui/ButtonGroup";

interface BillingTourStep2Props {}

const BillingTourStep2: React.FC<BillingTourStep2Props> = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    (navigation.navigate as any)("BillingTourStep1");
  };

  const handleNextPress = () => {
    (navigation.navigate as any)("BillingTourStep3");
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

        <View style={tw`items-center gap-y-2`}>
          <Text type="h1">PNM Profiles</Text>
          <Text type="p1" style={tw`text-center text-primary`}>
            Keep track of every PNM with favorites, tags, social media, and
            more; all in one streamlined profile
          </Text>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={tw`gap-y-4 items-center`}>
        <Stepper activeStep={2} stepCount={6} />

        <ButtonGroup>
          <Button size="sm" color="tertiary" onPress={handleBackPress}>
            Back
          </Button>
          <Button size="sm" color="primary" onPress={handleNextPress}>
            Next
          </Button>
        </ButtonGroup>
      </View>
    </SafeAreaView>
  );
};

export default BillingTourStep2;
