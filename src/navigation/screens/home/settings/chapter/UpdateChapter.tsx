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

import { Layout } from "@/ui/Layout";
import ListItem from "@/ui/ListItem";
import FormField from "@/ui/FormField";
import { useAuth } from "@/providers/Auth";
import type { HomeStackProps } from "@/navigation/@types";

type Props = HomeStackProps<"UpdateChapter">;

const UpdateChapter: React.FC<Props> = ({ navigation }) => {
  const { chapter } = useAuth();

  const onGeneralPress = () => {
    navigation.navigate("UpdateGeneral");
  };

  const onSecurityPress = () => {
    navigation.navigate("UpdateSecurity");
  };

  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Chapter"
        subtitle="Manage your chapter"
      />

      <Layout.Content gap={12} scrollable>
        <FormField
          disabled
          placeholder="Chapter Name"
          value={chapter.name || "N/A"}
        />
        <FormField
          disabled
          placeholder="School"
          value={chapter.school || "N/A"}
        />

        <ListItem
          size="lg"
          title="General"
          subtitle="Update general information"
          icon="building-2-fill"
          onPress={onGeneralPress}
        />

        <ListItem
          size="lg"
          title="Security"
          subtitle="Update security information"
          icon="shield-check-fill"
          onPress={onSecurityPress}
        />
      </Layout.Content>
    </Layout.Root>
  );
};

export default UpdateChapter;
