/*
 * Created on Wed Sep 18 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import type { IconType } from "@/ui/Icon";
import type { INotification } from "@/types";
import type { TimestampedData } from "@/lib/util/group";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import date from "@/lib/util/date";
import IconLabel from "@/ui/IconLabel";
import { useBottomSheet } from "@/providers/BottomSheet";

interface NotificationProps {
  notification: TimestampedData<INotification>;
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  const navigation = useNavigation();
  const { openBottomSheet } = useBottomSheet();
  const createdOn = notification.showDate ? notification.date : undefined;

  const iconType = {
    NEW_PNM: "user-fill",
    NEW_EVENT_RESPONSE: "calendar-2-fill",
    NEW_DYNAMIC_NOTIFICATION: "information-fill",
  }[notification.type] as IconType;

  const containerStyles = tw.style(
    "bg-slate-100 p-4 rounded-xl",
    "flex-row gap-4 items-center",
  );

  const onPress = () => {
    if (notification.type === "NEW_PNM") {
      openBottomSheet("PNM", { pnmId: notification.data.pnm._id });

      navigation.navigate("Main", {
        screen: "PNMsTab",
        params: {
          screen: "PNMs",
        },
      });
    }

    if (notification.type === "NEW_EVENT_RESPONSE") {
      openBottomSheet("EVENT", { eventId: notification.data.event._id });

      navigation.navigate("Main", {
        screen: "MoreTab",
        params: {
          screen: "Events",
        },
      });
    }

    if (notification.type === "NEW_DYNAMIC_NOTIFICATION") {
      const { title, message, iconName, iconColor } = notification.data;

      openBottomSheet("DYNAMIC_NOTIFICATION", {
        title,
        message,
        iconName,
        iconColor,
      });
    }
  };

  return (
    <View style={tw`gap-y-2`}>
      {createdOn && <Text type="p4">{createdOn}</Text>}

      <TouchableOpacity style={containerStyles} onPress={onPress}>
        <IconLabel
          size="xs"
          color="tertiary"
          iconName={iconType}
          iconColor={tw.color("primary")}
        />

        <View>
          <Text type="p2" style={tw`text-primary`}>
            {notification.title}
          </Text>
          <Text type="p3">{date.timeAgo(notification.createdAt)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Notification;
