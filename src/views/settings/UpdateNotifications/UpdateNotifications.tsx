/*
 * Created on Sun Feb 25 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import SelectionCard from "@/ui_v1/SelectionCard";
import { useNotifications } from "@/providers/Notifications";

const UpdateNotificationsView = () => {
  const {
    isLoading,
    notificationsEnabled,
    setNotificationsEnabled,
    enableNotificationsSubtitle,
    disableNotificationsSubtitle,
  } = useNotifications();

  const onNotificationsEnable = () => {
    setNotificationsEnabled(true);
  };

  const onNotificationsDisable = () => {
    setNotificationsEnabled(false);
  };

  return (
    <>
      <SelectionCard
        loading={isLoading}
        selected={notificationsEnabled}
        title="Enable Notifications"
        description="You will receive push notifications for various events to better help your chapter succeed."
        subtitle={enableNotificationsSubtitle}
        onPress={onNotificationsEnable}
      />
      <SelectionCard
        loading={isLoading}
        selected={!notificationsEnabled}
        title="Disable Notifications"
        description="You will not receive push notifications. You can turn notifications back on at any time."
        subtitle={disableNotificationsSubtitle}
        onPress={onNotificationsDisable}
      />
    </>
  );
};

export default UpdateNotificationsView;
