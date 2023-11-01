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

interface UITestingProps {
  navigation: NativeStackNavigationProp<any>;
}

const UITesting: React.FC<UITestingProps> = ({ navigation }) => {
  const { openModal } = useModalsStore();

  const onButtonPress = () => {
    openModal({
      name: "ERROR",
      props: {
        message: "This is a warning",
        secondaryButtonText: "Go Back",
        primaryButtonText: "Continue",
      },
    });
  };

  return (
    <Layout scrollable gap={12}>
      <Layout.Header
        hasBackButton
        title="UI Testing"
        subtitle="Test new UI in a sandbox environment"
      />

      <Button onPress={onButtonPress}>Confirm Delete</Button>
    </Layout>
  );
};

export default UITesting;
