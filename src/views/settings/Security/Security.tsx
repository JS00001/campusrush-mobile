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
import { useNavigation } from "@react-navigation/native";

import {
  useDeleteChapterSession,
  useGetChapterSessions,
} from "@/hooks/api/chapter";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import { alert } from "@/lib/util";
import ListItem from "@/ui/ListItem";
import Headline from "@/ui/Headline";
import Session from "@/components/Session";
import ListItemLoader from "@/ui/Loaders/ListItem";

const SecurityView = () => {
  const navigation = useNavigation();
  const sessionsQuery = useGetChapterSessions();
  const deleteSessionMutation = useDeleteChapterSession();

  const onChangePasswordPress = () => {
    navigation.navigate("Main", {
      screen: "HomeTab",
      params: {
        screen: "ChangePassword",
      },
    });
  };

  const onSessionRemove = (session: RefreshToken) => {
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
            const response = await deleteSessionMutation.mutateAsync({
              id: session._id,
            });

            if ("error" in response) return;

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
    if (!response || "error" in response) {
      return [];
    }

    return response.data.sessions;
  })();

  return (
    <>
      <Text type="h2">Actions</Text>
      <ListItem
        size="lg"
        icon="lock-password-fill"
        title="Change Password"
        subtitle="Update your current password"
        onPress={onChangePasswordPress}
      />

      <Headline
        title="Sessions"
        subtitle="All of the devices that are currently logged in with your account. You can remove sessions."
      />

      {sessionsQuery.isLoading && <SessionsLoader />}

      {!sessionsQuery.isLoading && !sessions.length && (
        <Text type="p3" style={tw`self-center text-green`}>
          No active sessions
        </Text>
      )}

      {!sessionsQuery.isLoading &&
        sessions.map((session, index) => (
          <Session
            key={index}
            session={session}
            onRemove={onSessionRemove.bind(null, session)}
          />
        ))}
    </>
  );
};

const SessionsLoader = () => {
  const array = new Array(5).fill(null);

  return array.map((_, index) => <ListItemLoader size="lg" key={index} />);
};

export default SecurityView;
