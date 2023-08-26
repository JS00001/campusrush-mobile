/*
 * Created on Mon Aug 07 2023
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

import Button from "@/ui/Button";
import Layout from "@/ui/Layout";
import TextInput from "@/ui/TextInput";

interface UpdateSecurityProps {
  navigation: NativeStackNavigationProp<any>;
}

const UpdateSecurity: React.FC<UpdateSecurityProps> = ({ navigation }) => {
  return (
    <Layout scrollable>
      <Layout.Header
        hasBackButton
        title="Security"
        subtitle="Update security information"
      />

      <TextInput placeholder="Current Password" secureTextEntry />
      <TextInput placeholder="New Password" secureTextEntry />
      <TextInput placeholder="Confirm Password" secureTextEntry />

      <Button>Save</Button>
    </Layout>
  );
};

export default UpdateSecurity;
