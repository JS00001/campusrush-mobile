/*
 * Created on Sun Sep 17 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Layout from "@/ui/Layout";
import Header from "@/ui/Header";
import { View } from "react-native";
import tw from "@/lib/tailwind";
import { useState } from "react";
import InfiniteCarousel from "@/ui/InfiniteCarousel";
import Text from "@/ui/Text";

interface UITestingProps {
  navigation: NativeStackNavigationProp<any>;
}

const UITesting: React.FC<UITestingProps> = ({ navigation }) => {
  const arrayOfTen = new Array(10).fill(0);

  const [data, setData] = useState([...arrayOfTen]);

  const onEndReached = async () => {
    // wait 5 seconds, then add 10 more items to the list
    await new Promise((resolve) => setTimeout(resolve, 50000));
    setData([...data, ...arrayOfTen]);
  };

  return (
    <Layout gap={12} contentContainerStyle={tw`pl-4 pr-0`}>
      <Layout.CustomHeader>
        <Header hasBackButton hasMenuButton title="Admin" />
      </Layout.CustomHeader>

      <View style={tw`w-full h-48 bg-purple-200`}>
        <InfiniteCarousel
          data={data}
          onEndReached={onEndReached}
          renderItem={({ item, index }) => (
            <View
              style={tw`w-64 h-full bg-green-500 items-center justify-center`}
            >
              <Text variant="header">{index + 1}</Text>
            </View>
          )}
        />
      </View>
    </Layout>
  );
};

export default UITesting;
