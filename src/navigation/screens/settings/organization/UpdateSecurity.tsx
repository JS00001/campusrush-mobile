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

import Layout from "@/ui/Layout";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface UpdateSecurityProps {
  navigation: NativeStackNavigationProp<any>;
}

const UpdateSecurity: React.FC<UpdateSecurityProps> = ({ navigation }) => {
  return (
    <Layout>
      <Layout.Header
        hasBackButton
        title="Security"
        subtitle="Update security information"
      />
    </Layout>
  );
};

export default UpdateSecurity;
