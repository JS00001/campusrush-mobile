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

import Layout from "@/ui/Layout";
import Button from "@/ui/Button";
import TextInput from "@/ui/TextInput";
import { useAuth } from "@/providers/Auth";

interface UpdateGeneralProps {
  navigation: NativeStackNavigationProp<any>;
}

const UpdateGeneral: React.FC<UpdateGeneralProps> = ({ navigation }) => {
  const { organization } = useAuth();

  return (
    <Layout scrollable>
      <Layout.Header
        hasBackButton
        title="General"
        subtitle="Update general information"
      />

      <TextInput placeholder="Email" value={organization.email || "N/A"} />
      <TextInput
        placeholder="First Name"
        value={organization.firstName || "N/A"}
      />
      <TextInput
        placeholder="Last Name"
        value={organization.lastName || "N/A"}
      />

      <Button>Save</Button>
    </Layout>
  );
};

export default UpdateGeneral;
