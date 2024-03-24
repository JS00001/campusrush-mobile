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
import Button from "@/ui/Button";
import { Layout } from "@/ui/Layout";
import Typewriter from "@/ui/Typewriter";
import Logo64 from "@/components/Logos/Logo64";
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
    <Layout.Root style={tw`bg-navy-300`}>
      <Layout.Content
        style={tw`bg-transparent`}
        contentContainerStyle={tw`justify-between h-full`}
      >
        <View style={tw`items-center gap-y-10 justify-center flex-1`}>
          <Logo64 />
          <Typewriter delay={20} type="h1" style={tw`text-white text-center`}>
            Elevate Recruitment With CampusRush
          </Typewriter>
        </View>

        <View style={tw`w-full`}>
          <Button color="secondary" onPress={handleCreateAccount}>
            Create Account
          </Button>
          <Button style={tw`bg-transparent`} onPress={handleLogBackIn}>
            Log Back In
          </Button>

          <TermsAndConditions color="secondary" />
        </View>
      </Layout.Content>
    </Layout.Root>
  );
};

export default Landing;
