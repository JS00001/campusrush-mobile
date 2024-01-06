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

import DetailView from "@/ui/DetailView";
import Header from "@/ui/Header";
import DateTimePicker from "@/ui/DateTimePicker";
import Tabs from "@/ui/Tabs";
import { useState } from "react";
import { useBottomSheets } from "@/providers/BottomSheet";
import Button from "@/ui/Button";

interface UITestingProps {
  navigation: NativeStackNavigationProp<any>;
}

const UITesting: React.FC<UITestingProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { handlePresentModalPress } = useBottomSheets();

  const onPress = () => {
    console.log("pressed");
    handlePresentModalPress("EDIT_EVENT");
  };

  return (
    <Layout gap={12}>
      <Layout.CustomHeader>
        <Header hasBackButton hasMenuButton title="Admin" />
      </Layout.CustomHeader>

      <DetailView>
        <DetailView.Section
          title="This is component 1 a a a a a a  a a aa "
          content="Hello"
        />
        <DetailView.Section title="This is component 2" content="Hello" />
      </DetailView>

      <DateTimePicker label="Select Time" value={new Date()} mode="datetime" />

      <DateTimePicker
        label="Select Time"
        value={new Date()}
        mode="time"
        error="This is an error"
      />

      <Tabs
        selectedIndex={activeTab}
        options={["Events", "Photos", "Videos"]}
        onChange={setActiveTab}
      />

      <Button onPress={onPress}>Bottom sheet</Button>
    </Layout>
  );
};

export default UITesting;
