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
import ActionCard from "@/ui/ActionCard";
import TextInput from "@/ui/TextInput";
import { useAuth } from "@/providers/Authv1";

interface UpdateChapterProps {
  navigation: NativeStackNavigationProp<any>;
}

const UpdateChapter: React.FC<UpdateChapterProps> = ({ navigation }) => {
  const { chapter } = useAuth();

  const onGeneralPress = () => {
    navigation.navigate("UpdateGeneral");
  };

  const onSecurityPress = () => {
    navigation.navigate("UpdateSecurity");
  };

  return (
    <Layout scrollable>
      <Layout.Header
        hasBackButton
        title="Chapter"
        subtitle="Manage your chapter"
      />

      <TextInput
        disabled
        placeholder="Chapter Name"
        value={chapter.name || "N/A"}
      />
      <TextInput
        disabled
        placeholder="School"
        value={chapter.school || "N/A"}
      />

      <ActionCard
        title="General"
        subtitle="Update general information"
        icon="ri-building-2-fill"
        onPress={onGeneralPress}
      />

      <ActionCard
        title="Security"
        subtitle="Update security information"
        icon="ri-shield-check-fill"
        onPress={onSecurityPress}
      />
    </Layout>
  );
};

export default UpdateChapter;
