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
import { useMutation } from "@tanstack/react-query";
import * as RNNotifications from "expo-notifications";
import { createContext, useContext, useEffect } from "react";

import { useAuth } from "@/providers/Auth";
import chapterApi from "@/api/api/chapter";

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

// Set the handler for notifications
RNNotifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

const NotificationsProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  // Import data from auth provider
  const { chapter, updateChapter, accessToken } = useAuth();

  // Get the notification status from the chapter
  const notificationsEnabled = chapter?.notificationsEnabled || false;

  // The message to display in the selection card
  const enableNotificationsSubtitle = notificationsEnabled
    ? "Currently Selected"
    : "Click to enable notifications";

  const disableNotificationsSubtitle = !notificationsEnabled
    ? "Currently Selected"
    : "Click to disable notifications";

  // The mutation to update the chapter
  // We will pass either the notificationPushToken or notificationsEnabled
  // depending on the function called
  const mutation = useMutation({
    mutationFn: (input: UpdateChapterInput) => {
      return chapterApi.updateChapter(input);
    },
  });

  // Every time the access token changes, we will check the notification status
  // This is so that we can update the notification token if the user logs in
  useEffect(() => {
    // Declare an async function to check the notification status
    const notificationStatus = async () => {
      // If there is no logged in user, return
      if (lodash.isEmpty(chapter)) return;

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

    // Call the async function
    notificationStatus();
  }, [accessToken]);

  // Returns whether we have permission to send notifications to the user
  const hasNotificationPermission = async () => {
    // Get the notification status
    const { status } = await RNNotifications.getPermissionsAsync();
    // Return whether we have permission
    return status === "granted";
  };

  // Requests permission to send notifications to the user and returns the status
  const requestNotificationPermission = async () => {
    // Request permission
    const { status } = await RNNotifications.requestPermissionsAsync();
    // Return the status
    return status;
  };

  // Sets the user's notification token in the server
  const setNotificationPushToken = async () => {
    // If there is no logged in user, return
    if (lodash.isEmpty(chapter)) return;

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
  const setNotificationsEnabled = async (value: boolean) => {
    // If there is no logged in user, return
    if (lodash.isEmpty(chapter)) return;

    // Check if we have permission to send notifications
    const hasPermission = await hasNotificationPermission();

    // If the value is false, update the notification status
    // We dont need to check for permission here because we are disabling
    // notifications
    if (!value) {
      await updateNotificationsEnabled(value);
      return;
    }

    // If we dont have permission and the value is true, request permission
    // and update the notification status
    if (!hasPermission && value) {
      const status = await requestNotificationPermission();

      // If we are granted permission, update the notification status
      if (status === "granted") {
        await updateNotificationsEnabled(value);
        return;
      }

      // If we are not granted permission, disable notifications
      await updateNotificationsEnabled(false);
    }

    // If we have permission and the value is true, update the notification status
    if (hasPermission && value) {
      await updateNotificationsEnabled(value);
    }
  };

  // Updates the notification status in the server (calls the mutation)
  const updateNotificationsEnabled = async (value: boolean) => {
    mutation.mutate(
      {
        notificationsEnabled: value,
      },
      {
        onSuccess: ({ data }) => {
          // Update the chapter with the new notificationsEnabled
          // from the server
          updateChapter(data.data.chapter);
        },
      },
    );
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
