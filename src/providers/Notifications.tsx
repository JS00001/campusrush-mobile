/*
 * Created on Sun Aug 27 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import lodash from "lodash";
import * as RNNotifications from "expo-notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { createContext, useContext, useEffect, useRef } from "react";

import { useAuth } from "@/providers/Auth";
import { useUpdateChapter } from "@/hooks/api/chapter";
import { useQonversion } from "@/providers/Qonversion";

interface NotificationsContextProps {
  isLoading: boolean;
  notificationsEnabled: boolean;
  enableNotificationsSubtitle: string;
  disableNotificationsSubtitle: string;
  setNotificationsEnabled: (value: boolean) => void;
}

const NotificationsContext = createContext<NotificationsContextProps>(
  {} as NotificationsContextProps,
);

// Notification handler WHEN THE APP IS OPEN
// We do not want to show alerts, play sounds, or set badges
RNNotifications.setNotificationHandler(null);

const NotificationsProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { entitlements } = useQonversion();
  const { chapter, setChapter, accessToken } = useAuth();
  const responseListener = useRef<RNNotifications.Subscription>();

  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const notificationsEnabled = chapter?.notificationsEnabled || false;

  const enableNotificationsSubtitle = notificationsEnabled
    ? "Currently Selected"
    : "Click to enable notifications";

  const disableNotificationsSubtitle = !notificationsEnabled
    ? "Currently Selected"
    : "Click to disable notifications";

  // The mutation to update the chapter
  // We will pass either the notificationPushToken or notificationsEnabled
  // depending on the function called
  const mutation = useUpdateChapter();

  useEffect(() => {
    responseListener.current =
      RNNotifications.addNotificationResponseReceivedListener((response) => {
        const { data } = response.notification.request.content;

        if (data.type === "NEW_MESSAGE") {
          const pnm: PNM = data.conversation.pnm;

          navigation.navigate("Conversation", {
            screen: "Chat",
            initial: false,
            params: {
              pnm,
            },
          });

          queryClient.invalidateQueries(["conversation", accessToken, pnm._id]);
        }
      });

    return () => {
      responseListener.current?.remove();
    };
  }, []);

  // Every time the access token changes, we will check the notification status
  // This is so that we can update the notification token if the user logs in
  useEffect(() => {
    const notificationStatus = async () => {
      // If there is no logged in user, return
      if (lodash.isEmpty(chapter)) return;
      if (lodash.isEmpty(entitlements)) return;

      // Check if we have permission to send notifications
      const hasPermission = await hasNotificationPermission();

      // If we have permission, send the notification token
      // to the server
      if (hasPermission) {
        await setNotificationPushToken();
        return;
      }

      // If we dont have notification permission, request it
      const status = await requestNotificationPermission();

      // If we are granted permission, send the notification token
      // to the server and enable notifications as a default
      if (status === "granted") {
        await setNotificationPushToken();
        await setNotificationsEnabled(true);
        return;
      }

      // If we are not granted permission, disable notifications
      await setNotificationsEnabled(false);
    };

    notificationStatus();
  }, [accessToken]);

  // Returns whether we have permission to send notifications to the user
  const hasNotificationPermission = async () => {
    const { status } = await RNNotifications.getPermissionsAsync();

    return status === "granted";
  };

  // Requests permission to send notifications to the user and returns the status
  const requestNotificationPermission = async () => {
    const { status } = await RNNotifications.requestPermissionsAsync();

    return status;
  };

  // Sets the user's notification token in the server
  const setNotificationPushToken = async () => {
    // If there is no logged in user, return
    if (lodash.isEmpty(chapter)) return;
    if (lodash.isEmpty(entitlements)) return;

    // Generate the notification token, we pass the project id
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    const notificationPushToken = await RNNotifications.getExpoPushTokenAsync({
      projectId: "9e0d874e-cc30-4dca-ae7e-9609b121b1ae",
    });

    // If we have a notification token, send it to the server
    if (notificationPushToken.data) {
      // Send the notification token to the server
      mutation.mutate({
        notificationPushToken: notificationPushToken.data,
      });
    }
  };

  // Sets the user's notification status in the server to either true or false
  const setNotificationsEnabled = async (
    shouldEnableNotifications: boolean,
  ) => {
    // If there is no logged in user, return
    if (lodash.isEmpty(chapter)) return;
    if (lodash.isEmpty(entitlements)) return;

    const hasPermission = await hasNotificationPermission();

    // If the value is false, update the notification status
    // We dont need to check for permission here because we are disabling
    // notifications
    if (!shouldEnableNotifications) {
      await updateNotificationsEnabled(shouldEnableNotifications);
      return;
    }

    // If we dont have permission and the value is true, request permission
    // and update the notification status
    if (!hasPermission && shouldEnableNotifications) {
      const status = await requestNotificationPermission();

      // If we are granted permission, update the notification status
      if (status === "granted") {
        await updateNotificationsEnabled(shouldEnableNotifications);
        return;
      }

      // If we are not granted permission, disable notifications
      await updateNotificationsEnabled(false);
    }

    // If we have permission and the value is true, update the notification status
    if (hasPermission && shouldEnableNotifications) {
      await updateNotificationsEnabled(shouldEnableNotifications);
    }
  };

  // Updates the notification status in the server (calls the mutation)
  const updateNotificationsEnabled = async (value: boolean) => {
    const res = await mutation.mutateAsync({
      notificationsEnabled: value,
    });

    if ("error" in res) return;

    setChapter(res.data.chapter);
  };

  return (
    <NotificationsContext.Provider
      value={{
        isLoading: mutation.isLoading,
        notificationsEnabled,
        enableNotificationsSubtitle,
        disableNotificationsSubtitle,
        setNotificationsEnabled,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);

export default NotificationsProvider;
