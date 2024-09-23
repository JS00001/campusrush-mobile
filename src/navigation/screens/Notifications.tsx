/*
 * Created on Sun Sep 15 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import tw from "@/lib/tailwind";
import { Layout } from "@/ui/Layout";
import FlatList from "@/ui/FlatList";
import group from "@/lib/util/group";
import SocketInput from "@/lib/socketInput";
import Notification from "@/ui/Notification";
import { useNotificationStore } from "@/store";
import useFocusEffect from "@/hooks/useFocusEffect";
import { useWebsocket } from "@/providers/Websocket";
import { useGetNotifications } from "@/hooks/api/chapter";
import NotificationLoader from "@/ui/Loaders/Notification";

const NotificationsScreen: React.FC = () => {
  const { ws } = useWebsocket();
  const query = useGetNotifications();
  const notificationStore = useNotificationStore();

  useFocusEffect(() => {
    const message = new SocketInput({
      type: "READ_NOTIFICATIONS",
    });

    ws?.send(message.toString());
    notificationStore.setState({ count: 0 });
  }, [notificationStore.notifications]);

  const onRefresh = async () => {
    await query.refetch();
  };

  const onEndReached = async () => {
    await query.fetchNextPage();
  };

  return (
    <Layout.Root>
      <Layout.Header
        title="Notifications"
        subtitle="Recent updates to your account"
      />

      <Layout.Content gap={8} contentContainerStyle={tw`pb-0`}>
        <FlatList
          emptyListTitle="No notifications"
          emptyListSubtitle="You're all caught up!"
          disableOnEndReached={!query.hasNextPage}
          data={group.byDate(query.notifications, "createdAt")}
          renderItem={({ item }) => <Notification notification={item} />}
          loadingComponent={<NotificationLoader />}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
        />
      </Layout.Content>
    </Layout.Root>
  );
};

export default NotificationsScreen;
