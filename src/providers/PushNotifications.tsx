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
import { useNavigation } from "@react-navigation/native";
import { createContext, useContext, useEffect, useRef } from "react";

import type { IPNM, IEvent } from "@/types";

import { isLoggedIn } from "@/lib/auth";
import { useUser } from "@/providers/User";
import queryClient from "@/lib/query-client";
import { useUpdateChapter } from "@/hooks/api/chapter";
import { useBottomSheet } from "@/providers/BottomSheet";
import { useQonversion } from "@/providers/external/Qonversion";

interface IPushNotificationsContext {
  isLoading: boolean;
  enabled: boolean;
  setEnabled: (value: boolean) => void;
}

const PushNotificationsContext = createContext<IPushNotificationsContext>(
  {} as IPushNotificationsContext,
);

// Notification handler WHEN THE APP IS OPEN
// We do not want to show alerts, play sounds, or set badges
RNNotifications.setNotificationHandler(null);

const PushNotificationsProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { chapter } = useUser();
  const { entitlements } = useQonversion();
  const { openBottomSheet } = useBottomSheet();
  const responseListener = useRef<RNNotifications.Subscription>();

  const navigation = useNavigation();
  const updateChapterMutation = useUpdateChapter();

  const enabled = chapter?.notifications.enabled || false;

  /**
   * Event listener for when a push notification is opened
   */
  useEffect(() => {
    responseListener.current =
      RNNotifications.addNotificationResponseReceivedListener((response) => {
        onPushNotification(response);
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
    const pushNotificationStatus = async () => {
      if (!isLoggedIn()) return;
      if (lodash.isEmpty(entitlements)) return;

      const hasPermission = await hasPushNotificationPermission();

      if (hasPermission) {
        await setPushNotificationToken();
        return;
      }

      const status = await requestPushNotificationPermission();

      // If we are granted permission, send the notification token
      // to the server and enable notifications as a default
      if (status === "granted") {
        await setPushNotificationToken();
        await setEnabled(true);
        return;
      }

      // If we are not granted permission, disable notifications
      await setEnabled(false);
    };

    pushNotificationStatus();
  }, [entitlements]);

  /**
   * Whether we have permission to send notifications to the user
   */
  const hasPushNotificationPermission = async () => {
    const { status } = await RNNotifications.getPermissionsAsync();

    return status === "granted";
  };

  /**
   * Request permission to send notifications to the user
   */
  const requestPushNotificationPermission = async () => {
    const { status } = await RNNotifications.requestPermissionsAsync();

    return status;
  };

  /**
   * Updates the notification push token in the server
   */
  const setPushNotificationToken = async () => {
    if (lodash.isEmpty(chapter)) return;
    if (lodash.isEmpty(entitlements)) return;

    // Generate the notification token, we pass the project id
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    const pushNotificationToken = await RNNotifications.getExpoPushTokenAsync({
      projectId: "9e0d874e-cc30-4dca-ae7e-9609b121b1ae",
    });

    if (pushNotificationToken.data) {
      updateChapterMutation.mutate({
        notificationPushToken: pushNotificationToken.data,
      });
    }
  };

  /**
   * Check if we have permission to send notifications to the user, then update
   * the notification status based on the value passed
   */
  const setEnabled = async (shouldEnable: boolean) => {
    if (lodash.isEmpty(chapter)) return;
    if (lodash.isEmpty(entitlements)) return;

    const hasPermission = await hasPushNotificationPermission();

    // If the value is false, update the notification status
    // We dont need to check for permission here because we are disabling
    // notifications
    if (!shouldEnable) {
      await updatePushNotificationsEnabled(shouldEnable);
      return;
    }

    // If we dont have permission and the value is true, request permission
    // and update the notification status
    if (!hasPermission && shouldEnable) {
      const status = await requestPushNotificationPermission();

      if (status === "granted") {
        await updatePushNotificationsEnabled(shouldEnable);
        return;
      }

      // If we are not granted permission, disable notifications
      await updatePushNotificationsEnabled(false);
    }

    // If we have permission and the value is true, update the notification status
    if (hasPermission && shouldEnable) {
      await updatePushNotificationsEnabled(shouldEnable);
    }
  };

  /**
   * Update the notification status for the user in the server
   */
  const updatePushNotificationsEnabled = async (value: boolean) => {
    await updateChapterMutation.mutateAsync({
      notificationsEnabled: value,
    });
  };

  /**
   * Handle the notification when the app is open
   */
  const onPushNotification = async (
    response: RNNotifications.NotificationResponse,
  ) => {
    const { data } = response.notification.request.content;

    if (!data) return;

    const { payload, notification } = data;

    // Handle notification
    if (notification) {
      queryClient.refetchQueries({ queryKey: ["notifications"] });
    }

    if (payload.type === "NEW_MESSAGE") {
      const pnm: IPNM = payload.pnm;
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({ queryKey: ["conversation", pnm._id] });

      navigation.navigate("Conversation", {
        screen: "Chat",
        initial: false,
        params: { pnm },
      });
    }

    if (payload.type === "NEW_PNM") {
      const pnm: IPNM = payload.pnm;
      queryClient.invalidateQueries({ queryKey: ["pnms"] });

      openBottomSheet("PNM", { pnm });
      navigation.navigate("Main", {
        screen: "PNMsTab",
        params: {
          screen: "PNMs",
        },
      });
    }

    if (payload.type === "NEW_EVENT_RESPONSE") {
      const event: IEvent = payload.event;
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", event._id] });

      openBottomSheet("EVENT", { event });
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
    <PushNotificationsContext.Provider
      value={{
        enabled,
        setEnabled,
        isLoading: updateChapterMutation.isPending,
      }}
    >
      {children}
    </PushNotificationsContext.Provider>
  );
};

export const usePushNotifications = () => useContext(PushNotificationsContext);

export default PushNotificationsProvider;
