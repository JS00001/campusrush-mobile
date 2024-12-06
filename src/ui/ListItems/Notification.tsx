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

import type { INotification } from "@/types";
import type { IconType } from "@/constants/icons";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import date from "@/lib/util/date";
import IconLabel from "@/ui/IconLabel";
import { useBottomSheetStore } from "@/store";

interface NotificationProps {
  notification: INotification;
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  const navigation = useNavigation();
  const bottomSheetStore = useBottomSheetStore();

  const iconType = ({
    NEW_PNM: "User",
    NEW_EVENT_RESPONSE: "Calendar",
    NEW_DYNAMIC_NOTIFICATION: "Info",
    NEW_FORM_RESPONSE: "ListBullets",
  }[notification.type] || "Bell") as IconType;

  const containerStyles = tw.style(
    "bg-gray-100 p-4 rounded-xl",
    "flex-row gap-4 items-center",
  );

  const onPress = () => {
    if (notification.type === "NEW_PNM") {
      const { pnm } = notification.data;
      bottomSheetStore.open("PNM", { pnm });

      navigation.navigate("Main", {
        screen: "PNMsTab",
        params: {
          screen: "PNMs",
        },
      });
    }

    if (notification.type === "NEW_EVENT_RESPONSE") {
      const { event } = notification.data;
      bottomSheetStore.open("EVENT", { event });

      navigation.navigate("Main", {
        screen: "MoreTab",
        params: {
          screen: "Events",
        },
      });
    }

    if (notification.type === "NEW_FORM_RESPONSE") {
      const { form } = notification.data;
      bottomSheetStore.open("FORM_RESPONSES", { formId: form._id });

      navigation.navigate("Main", {
        screen: "MoreTab",
        params: {
          screen: "Forms",
        },
      });
    }

    if (notification.type === "NEW_DYNAMIC_NOTIFICATION") {
      const { title, message, iconName, iconColor } = notification.data;

      bottomSheetStore.open("DYNAMIC_NOTIFICATION", {
        title,
        message,
        iconName,
        iconColor,
      });
    }
  };

  return (
    <View style={tw`gap-y-2`}>
      <TouchableOpacity style={containerStyles} onPress={onPress}>
        <IconLabel
          size="md"
          color="tertiary"
          iconName={iconType}
          iconColor={tw.color("primary")}
        />

        <View style={tw`flex-1`}>
          <Text type="p2" style={tw`text-primary`} numberOfLines={2}>
            {notification.title}
          </Text>
          <Text type="p3">{date.timeAgo(notification.createdAt)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Notification;
