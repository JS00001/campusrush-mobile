/*
 * Created on Sun Aug 11 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import Toast from "react-native-toast-message";

import type { IRefreshToken } from "@/types";

import {
  useDeleteChapterSession,
  useGetChapterSessions,
} from "@/hooks/api/chapter";
import { alert } from "@/lib/util";
import FlatList from "@/ui/FlatList";
import Session from "@/components/Session";
import ListItemLoader from "@/ui/Loaders/ListItem";

const SessionsView = () => {
  const sessionsQuery = useGetChapterSessions();
  const deleteSessionMutation = useDeleteChapterSession();

  const onSessionRemove = (session: IRefreshToken) => {
    alert({
      title: "Remove Session",
      message:
        "Are you sure you want to remove this session? The user will be logged out.",
      buttons: [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            await deleteSessionMutation.mutateAsync({
              id: session._id,
            });

            sessionsQuery.refetch();

            Toast.show({
              type: "success",
              text1: "Session removed",
              text2: "The session has been removed successfully",
            });
          },
        },
      ],
    });
  };

  const sessions = (() => {
    const response = sessionsQuery.data;
    if (!response || sessionsQuery.isError) return [];
    return response.data.sessions;
  })();

  const onRefresh = async () => {
    await sessionsQuery.refetch();
  };

  return (
    <FlatList
      emptyListTitle="No active sessions"
      emptyListSubtitle="Once you log in from a new device, it will appear here"
      data={sessions}
      onRefresh={onRefresh}
      loading={sessionsQuery.isLoading}
      loadingComponent={<ListItemLoader size="lg" />}
      renderItem={({ item }) => (
        <Session session={item} onRemove={onSessionRemove.bind(null, item)} />
      )}
    />
  );
};

export default SessionsView;
