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
import Button from "@/ui/Button";
import tw from "@/lib/tailwind";

import Layout from "@/ui/Layout";
import LandingSvg from "@/assets/LandingSvg";
import Logo64Svg from "@/assets/Logo64Svg";
import Text from "@/ui/Text";
import TermsAndConditions from "@/components/TermsAndConditions";

const Landing = () => {
  return (
    <>
      <LandingSvg />

      <Layout style={tw`justify-between`}>
        <View style={tw`items-center gap-y-10 justify-center h-2/3`}>
          <Logo64Svg />
          <Text
            variant="header"
            style={tw`text-white text-center`}
          >
            Elevate Recruitment With CampusRush
          </Text>
        </View>

        <View style={tw`w-full`}>
          <Button color="light">Create Account</Button>
          <Button style={tw`bg-transparent`}>Log Back In</Button>
          <TermsAndConditions color="light" />
        </View>
      </Layout>
    </>
  );
};

export default Landing;
