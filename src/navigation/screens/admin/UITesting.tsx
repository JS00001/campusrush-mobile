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
import DetailView from "@/ui/DetailView";

interface UITestingProps {
  navigation: NativeStackNavigationProp<any>;
}

const UITesting: React.FC<UITestingProps> = ({ navigation }) => {
  return (
    <Layout gap={12}>
      <Layout.Header
        hasBackButton
        title="UI Testing"
        subtitle="Test new UI in a sandbox environment"
      />

      <DetailView>
        <DetailView.Section
          title="This is component 1 a a a a a a  a a aa "
          content="Hello"
        />
        <DetailView.Section title="This is component 2" content="Hello" />
      </DetailView>
    </Layout>
  );
};

export default UITesting;
