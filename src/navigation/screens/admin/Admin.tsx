/*
 * Created on Fri Sep 15 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import ListItem from "@/ui/ListItem";
import { Layout } from "@/ui/Layout";
import type { AdminStackProps } from "@/navigation/@types";

type Props = AdminStackProps<"Admin">;

const Admin: React.FC<Props> = ({ navigation }) => {
  const onChaptersPress = () => {
    navigation.navigate("AdminChapters");
  };

  const onUITestingPress = () => {
    navigation.navigate("AdminUITesting");
  };

  const onNetworkPress = () => {
    navigation.navigate("AdminNetwork");
  };

  return (
    <Layout.Root>
      <Layout.Header title="Admin" subtitle="Admin options/developer options" />

      <Layout.Content scrollable gap={12}>
        <ListItem
          size="lg"
          title="View Chapters"
          subtitle="List all registered chapters"
          icon="group-fill"
          onPress={onChaptersPress}
        />
        <ListItem
          size="lg"
          title="Network"
          subtitle="View network logs"
          icon="wifi-fill"
          onPress={onNetworkPress}
        />
        <ListItem
          size="lg"
          title="UI Testing"
          subtitle="Test new UI components in a sandbox"
          icon="test-tube-fill"
          onPress={onUITestingPress}
        />
      </Layout.Content>
    </Layout.Root>
  );
};

export default Admin;
