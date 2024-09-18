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

import type { IPNM, IEvent } from "@/types";

import { useAuth } from "@/providers/Auth";
import { useUpdateChapter } from "@/hooks/api/chapter";
import { useQonversion } from "@/providers/Qonversion";
import { useBottomSheet } from "@/providers/BottomSheet";
import { useGlobalStore, useNotificationStore } from "@/store";

interface NotificationsContextProps {
  isLoading: boolean;
  notificationsEnabled: boolean;
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
  const { openBottomSheet } = useBottomSheet();
  const { chapter, setChapter, accessToken } = useAuth();
  const responseListener = useRef<RNNotifications.Subscription>();

  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const globalStore = useGlobalStore();
  const mutation = useUpdateChapter();
  const notificationStore = useNotificationStore();

  const notificationsEnabled = chapter?.notifications.enabled || false;

  /**
   * Event listener for when a push notification is opened
   */
  useEffect(() => {
    responseListener.current =
      RNNotifications.addNotificationResponseReceivedListener((response) => {
        onNotification(response);
      });

    return () => {
      responseListener.current?.remove();
    };
  }, []);

  /**
   * Every time the chapter changes, we will check the notification status
   * This is so that we can update the notification token if the user logs in
   */
  useEffect(() => {
    const notificationStatus = async () => {
      if (lodash.isEmpty(chapter)) return;
      if (lodash.isEmpty(entitlements)) return;

      const hasPermission = await hasNotificationPermission();

      if (hasPermission) {
        await setNotificationPushToken();
        return;
      }

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

  /**
   * Whether we have permission to send notifications to the user
   */
  const hasNotificationPermission = async () => {
    const { status } = await RNNotifications.getPermissionsAsync();

    return status === "granted";
  };

  /**
   * Request permission to send notifications to the user
   */
  const requestNotificationPermission = async () => {
    const { status } = await RNNotifications.requestPermissionsAsync();

    return status;
  };

  /**
   * Updates the notification push token in the server
   */
  const setNotificationPushToken = async () => {
    if (lodash.isEmpty(chapter)) return;
    if (lodash.isEmpty(entitlements)) return;

    // Generate the notification token, we pass the project id
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    const notificationPushToken = await RNNotifications.getExpoPushTokenAsync({
      projectId: "9e0d874e-cc30-4dca-ae7e-9609b121b1ae",
    });

    if (notificationPushToken.data) {
      mutation.mutate({
        notificationPushToken: notificationPushToken.data,
      });
    }
  };

  /**
   * Check if we have permission to send notifications to the user, then update
   * the notification status based on the value passed
   */
  const setNotificationsEnabled = async (
    shouldEnableNotifications: boolean,
  ) => {
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

  /**
   * Update the notification status for the user in the server
   */
  const updateNotificationsEnabled = async (value: boolean) => {
    const response = await mutation.mutateAsync({
      notificationsEnabled: value,
    });

    setChapter(response.data.chapter);
  };

  /**
   * Handle the notification when the app is open
   */
  const onNotification = async (
    response: RNNotifications.NotificationResponse,
  ) => {
    const { data } = response.notification.request.content;

    if (!data) return;

    const { payload, notification } = data;
    if (notification) notificationStore.addOrUpdateNotification(notification);

    if (payload.type === "NEW_MESSAGE") {
      const pnm: IPNM = payload.pnm;
      queryClient.refetchQueries(["conversations", accessToken]);
      queryClient.refetchQueries(["conversation", accessToken, pnm._id]);

      navigation.navigate("Conversation", {
        screen: "Chat",
        initial: false,
        params: {
          pnm,
        },
      });
    }

    if (payload.type === "NEW_PNM") {
      const pnm: IPNM = payload.pnm;
      globalStore.addOrUpdatePnm(pnm);
      openBottomSheet("PNM", { pnmId: pnm._id });

      navigation.navigate("Main", {
        screen: "PNMsTab",
        params: {
          screen: "PNMs",
        },
      });
    }

    if (payload.type === "NEW_EVENT_RESPONSE") {
      const event: IEvent = payload.event;
      openBottomSheet("EVENT", { eventId: event._id });

      navigation.navigate("Main", {
        screen: "MoreTab",
        params: {
          screen: "Events",
        },
      });
    }

    if (payload.type === "NEW_DYNAMIC_NOTIFICATION") {
      const { title, message, iconName, iconColor } = payload;

      openBottomSheet("DYNAMIC_NOTIFICATION", {
        title,
        message,
        iconName,
        iconColor,
      });
    }
  };

  return (
    <NotificationsContext.Provider
      value={{
        isLoading: mutation.isLoading,
        notificationsEnabled,
        setNotificationsEnabled,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);

export default NotificationsProvider;
