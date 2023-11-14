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
import CopyItem from "@/ui/CopyItem";

interface UITestingProps {
  navigation: NativeStackNavigationProp<any>;
}

const UITesting: React.FC<UITestingProps> = ({ navigation }) => {
  const { openModal } = useModalsStore();

  const onButtonPress = () => {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "The button was pressed",
    });
  };

  const onErrorButtonPress = () => {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "The button was pressed",
    });
  };

  const onWarningButtonPress = () => {
    Toast.show({
      type: "warning",
      text1: "Warning",
      text2: "The button was pressed",
    });
  };

  const onInfoButtonPress = () => {
    Toast.show({
      type: "info",
      text1: "Info",
      text2: "The button was pressed",
    });
  };

  const onBigMessageButtonPress = () => {
    Toast.show({
      type: "success",
      text1:
        "Success wraps as well and is a really long message that cant be seen",
      text2:
        "The button was pressed and this is a really long message that should wrap. There is a lot of text here and it should wrap to the next line. This is a really long message that should wrap. There is a lot of text here and it should wrap to the next line. This is a really long message that should wrap. There is a lot of text here and it should wrap to the next line.",
    });
  };

  return (
    <Layout scrollable gap={12}>
      <Layout.Header
        hasBackButton
        title="UI Testing"
        subtitle="Test new UI in a sandbox environment"
      />

      <CopyItem
        label="Website"
        value="https://jacksenyitko.com/this/is/long/and/longer"
      />

      <Button onPress={onButtonPress}>Show Success Toast</Button>

      <Button onPress={onErrorButtonPress}>Show Error Toast</Button>
      <Button onPress={onWarningButtonPress}>Show Warning Toast</Button>
      <Button onPress={onInfoButtonPress}>Show Info Toast</Button>
      <Button onPress={onBigMessageButtonPress}>Show Big Message Toast</Button>

      <Information tooltip="This is a tooltip" size="sm" />
    </Layout>
  );
};

export default UITesting;
