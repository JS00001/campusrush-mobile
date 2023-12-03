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
import Button from "@/ui/Button";
import Information from "@/ui/Information";
import useModalsStore from "@/state/modals";
import Toast from "react-native-toast-message";
import Tooltip from "@/ui/Tooltip";
import Text from "@/ui/Text";
import CopyItem from "@/ui/CopyItem";
import InfiniteScroll from "@/ui/InfiniteScroll";
import { useState } from "react";
import { View } from "react-native";
import tw from "@/lib/tailwind";

interface UITestingProps {
  navigation: NativeStackNavigationProp<any>;
}

const UITesting: React.FC<UITestingProps> = ({ navigation }) => {
  const initialData = new Array(20).fill(0).map((_, i) => `Item ${i + 1}`);

  const [data, setData] = useState(initialData);

  const onEndReached = async () => {
    return new Promise<void>(async (resolve) => {
      // wait 2 second before running the code
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Get the last number in the data array
      const lastNumber = parseInt(data[data.length - 1].split(" ")[1]);

      // Create a new array of 20 items
      const newData = new Array(20)
        .fill(0)
        .map((_, i) => `Item ${lastNumber + i + 1}`);

      // Add the new data to the existing data
      setData((prevData) => [...prevData, ...newData]);

      // Resolve the promise
      resolve();
    });
  };

  return (
    <Layout gap={12}>
      <Layout.Header
        hasBackButton
        title="UI Testing"
        subtitle="Test new UI in a sandbox environment"
      />

      <InfiniteScroll
        onRefresh={async () => {}}
        data={data}
        renderItem={({ item }) => (
          <View style={tw`bg-red-500 w-full p-5 mb-2`}>
            <Text style={tw`text-white`}>{item}</Text>
          </View>
        )}
        onEndReached={onEndReached}
      />
    </Layout>
  );
};

export default UITesting;
