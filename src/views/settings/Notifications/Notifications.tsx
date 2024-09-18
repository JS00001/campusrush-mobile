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

import SelectionCard from "@/ui/SelectionCard";
import { useNotifications } from "@/providers/Notifications";

const NotificationsView = () => {
  const { isLoading, notificationsEnabled, setNotificationsEnabled } =
    useNotifications();

  const onNotificationsEnable = () => {
    setNotificationsEnabled(true);
  };

  const onNotificationsDisable = () => {
    setNotificationsEnabled(false);
  };

  const enableNotificationsSubtitle = notificationsEnabled
    ? "Currently Selected"
    : "Click to enable notifications";

  const disableNotificationsSubtitle = !notificationsEnabled
    ? "Currently Selected"
    : "Click to disable notifications";

  return (
    <>
      <SelectionCard
        loading={isLoading}
        selected={notificationsEnabled}
        title="Enable Notifications"
        subtitle="You will receive push notifications for various events to better help your chapter succeed."
        description={enableNotificationsSubtitle}
        onPress={onNotificationsEnable}
      />
      <SelectionCard
        loading={isLoading}
        selected={!notificationsEnabled}
        title="Disable Notifications"
        subtitle="You will not receive push notifications. You can turn notifications back on at any time."
        description={disableNotificationsSubtitle}
        onPress={onNotificationsDisable}
      />
    </>
  );
};

export default NotificationsView;
