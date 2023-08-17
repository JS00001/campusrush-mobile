/*
 * Created on Mon Aug 07 2023
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
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import Button from "@/ui/Button";
import Typewriter from "@/ui/Typewriter";
import Logo64Svg from "@/assets/Logo64Svg";
import LandingSvg from "@/assets/LandingSvg";
import TermsAndConditions from "@/components/TermsAndConditions";

interface LandingProps {
  navigation: NativeStackNavigationProp<any>;
}

const Landing: React.FC<LandingProps> = ({ navigation }) => {
  const handleCreateAccount = () => {
    navigation.navigate("RegistrationStep1");
  };

  const handleLogBackIn = () => {
    navigation.navigate("Login");
  };

  return (
    <>
      <LandingSvg />

      <Layout
        style={tw`bg-transparent`}
        contentContainerStyle={tw`justify-between`}
      >
        <View style={tw`items-center gap-y-10 justify-center h-2/3`}>
          <Logo64Svg />
          <Typewriter
            delay={20}
            variant="header"
            style={tw`text-white text-center`}
            text="Elevate Recruitment With CampusRush"
          />
        </View>

        <View style={tw`w-full`}>
          <Button color="light" onPress={handleCreateAccount}>
            Create Account
          </Button>
          <Button style={tw`bg-transparent`} onPress={handleLogBackIn}>
            Log Back In
          </Button>
          {__DEV__ && (
            <Button
              style={tw`bg-transparent`}
              onPress={() => navigation.navigate("UITesting")}
            >
              UI Testing
            </Button>
          )}
          <TermsAndConditions color="light" />
        </View>
      </Layout>
    </>
  );
};

export default Landing;
