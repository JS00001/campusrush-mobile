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
import useModalsStore from "@/state/modals";
import Toast from "react-native-toast-message";

interface UITestingProps {
  navigation: NativeStackNavigationProp<any>;
}

const UITesting: React.FC<UITestingProps> = ({ navigation }) => {
  const { openModal } = useModalsStore();

  const onButtonPress = () => {
    Toast.show({
      type: "success",
      autoHide: false,
      text1: "Success",
      text2: "The button was pressed",
    });
  };

  const onErrorButtonPress = () => {
    Toast.show({
      type: "error",
      autoHide: false,
      text1: "Error",
      text2: "The button was pressed",
    });
  };

  const onBigMessageButtonPress = () => {
    Toast.show({
      type: "success",
      autoHide: false,
      text1: "Success",
      text2:
        "The button was pressed and this is a really long message that should wrap",
    });
  };

  return (
    <Layout scrollable gap={12}>
      <Layout.Header
        hasBackButton
        title="UI Testing"
        subtitle="Test new UI in a sandbox environment"
      />

      <Button onPress={onButtonPress}>Show Success Toast</Button>
      <Button onPress={onErrorButtonPress}>Show Error Toast</Button>
      <Button onPress={onBigMessageButtonPress}>Show Big Message Toast</Button>
    </Layout>
  );
};

export default UITesting;
