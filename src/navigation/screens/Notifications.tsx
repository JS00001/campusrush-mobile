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
import { useMemo } from "react";

import tw from "@/lib/tailwind";
import { Layout } from "@/ui/Layout";
import FlatList from "@/ui/FlatList";

import date from "@/lib/util/date";
import SocketInput from "@/lib/socketInput";
import queryClient from "@/lib/query-client";
import StickyHeader from "@/ui/StickyHeader";
import useFocusEffect from "@/hooks/useFocusEffect";
import { useWebsocket } from "@/providers/Websocket";
import Notification from "@/ui/ListItems/Notification";
import { useGetNotifications } from "@/hooks/api/chapter";
import NotificationLoader from "@/ui/Loaders/Notification";

const NotificationsScreen: React.FC = () => {
  const { ws } = useWebsocket();
  const query = useGetNotifications();

  /**
   * Clear all notifications when the user opens the
   * notifications screen
   */
  useFocusEffect(() => {
    const message = new SocketInput({
      type: "READ_NOTIFICATIONS",
    });

    ws?.send(message.toString());
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  }, []);

  const notifications = query.data.notifications ?? [];

  /**
   * Create groupings of events by date, and extract
   * the indices of the sticky headers (the dates)
   */
  const [data, stickyHeaderIndexes] = useMemo(() => {
    /**
     * Take the list of notifications and reduce them into a list like this
     * {
     *  "Date": ['Today', notification1, notification2],
     *  "Date": ['Yestderday', notification1, notification2],
     * }
     */
    const groupedNotifications = notifications.reduce(
      (accumulator, notification) => {
        const startDate = new Date(notification.createdAt);
        const relativeDate = date.getRelativeDate(startDate);

        if (accumulator[relativeDate]) {
          accumulator[relativeDate].push(notification);
        } else {
          accumulator[relativeDate] = [relativeDate, notification];
        }

        return accumulator;
      },
      {},
    );

    // Sort the keys by date, and flatten the list
    const sortedKeys = Object.keys(groupedNotifications)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .flatMap((key) => groupedNotifications[key]);

    // Get the indices of the sticky headers
    const stickyHeaderIndices = sortedKeys.reduce((indices, item, i) => {
      if (typeof item === "string") {
        indices.push(i);
      }

      return indices;
    }, []);

    return [sortedKeys, stickyHeaderIndices];
  }, [notifications]);

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
          data={data}
          emptyListTitle="No notifications"
          emptyListSubtitle="You're all caught up!"
          error={query.error}
          errorDescription="Could not fetch notifications"
          loading={query.isLoading}
          loadingComponent={<NotificationLoader />}
          disableOnEndReached={!query.hasNextPage}
          stickyHeaderIndices={stickyHeaderIndexes}
          renderItem={({ item: notification }) => {
            if (typeof notification === "string") {
              return <StickyHeader>{notification}</StickyHeader>;
            }
            return <Notification notification={notification} />;
          }}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
        />
      </Layout.Content>
    </Layout.Root>
  );
};

export default NotificationsScreen;
