/*
 * Created on Mon Mar 18 2024
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
import NetworkLogger from "react-native-network-logger";

import tw from "@/lib/tailwind";

const Network = () => {
  return (
    <View style={tw`h-96`}>
      <NetworkLogger
        theme={{
          colors: {
            background: "white",
          },
        }}
      />
    </View>
  );
};

export default Network;
