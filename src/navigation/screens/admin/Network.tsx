/*
 * Created on Tue Dec 12 2023
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
import NetworkLogger from "react-native-network-logger";

import Layout from "@/ui/Layout";
import tw from "@/lib/tailwind";

const Network: React.FC = () => {
  return (
    <Layout gap={12}>
      <Layout.Header
        hasBackButton
        title="Network"
        subtitle="View network logs"
      />

      <View style={tw`flex-1 w-full`}>
        <NetworkLogger
          theme={{
            colors: {
              background: "white",
            },
          }}
        />
      </View>
    </Layout>
  );
};

export default Network;
