/*
 * Created on Mon Dec 16 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { Layout } from "@/ui/Layout";
import ActionButton from "@/ui/ActionButton";
import { useBottomSheetStore } from "@/store";

const ManageUsersScreen: React.FC = () => {
  const bottomSheetStore = useBottomSheetStore();

  const onCreateUserPress = () => {
    bottomSheetStore.open("CREATE_USER");
  };

  return (
    <Layout.Root>
      <Layout.Header
        title="Manage Users"
        subtitle="Manage your chapter's users"
      />

      <Layout.Content gap={12}>
        <ActionButton
          ph-label="create-chapter-user"
          icon="Plus"
          onPress={onCreateUserPress}
        />
      </Layout.Content>
    </Layout.Root>
  );
};

export default ManageUsersScreen;
