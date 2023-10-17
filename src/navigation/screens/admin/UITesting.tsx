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
import ButtonGroup from "@/ui/ButtonGroup";
import Button from "@/ui/Button";
import tw from "@/lib/tailwind";

interface UITestingProps {
  navigation: NativeStackNavigationProp<any>;
}

const UITesting: React.FC<UITestingProps> = ({ navigation }) => {
  return (
    <Layout scrollable gap={12}>
      <Layout.Header
        hasBackButton
        title="UI Testing"
        subtitle="Test new UI in a sandbox environment"
      />

      <ButtonGroup>
        <Button size="sm" color="gray">
          Test1
        </Button>
        <Button size="sm">Test2 long</Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button size="sm">Test1</Button>
        <Button size="sm">Test2</Button>
        <Button size="sm">Test3</Button>
      </ButtonGroup>
    </Layout>
  );
};

export default UITesting;
