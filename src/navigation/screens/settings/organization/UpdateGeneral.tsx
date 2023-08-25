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

interface UpdateGeneralProps {
  navigation: NativeStackNavigationProp<any>;
}

const UpdateGeneral: React.FC<UpdateGeneralProps> = ({ navigation }) => {
  return (
    <Layout>
      <Layout.Header
        hasBackButton
        title="General"
        subtitle="Update general information"
      />
    </Layout>
  );
};

export default UpdateGeneral;
