/*
 * Created on Fri Mar 15 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";

import type { Event } from "@/types";

import EventDate from "./Date";

import Text from "@/ui/Text";
import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";
import date from "@/lib/util/date";
import format from "@/lib/util/format";

interface EventProps extends Omit<TouchableOpacityProps, "onPress"> {
  event: Event;
  style?: any;
  onPress?: (event: Event) => void;
}

const Event: React.FC<EventProps> = ({
  event,
  style,
  onPress,
  disabled,
  ...props
}) => {
  const formattedEvent = format.event(event)!;
  const hasEventPassed = date.hasPassed(formattedEvent.startDate);

  const handlePress = () => {
    if (onPress) {
      onPress(event);
    }
  };

  const containerStyles = tw.style(
    "bg-slate-100 rounded-xl w-full",
    "flex-row justify-between items-center p-4",
    hasEventPassed && "disabled",
    style,
  );

  const contentContainerStyles = tw.style("flex-row shrink gap-5");

  return (
    <TouchableOpacity
      disabled={disabled}
      style={containerStyles}
      onPress={handlePress}
      {...props}
    >
      <View style={contentContainerStyles}>
        <EventDate
          month={formattedEvent.start.month}
          day={formattedEvent.start.day}
          weekday={formattedEvent.start.weekday}
        />

        <View style={tw`shrink`}>
          <Text type="h2" numberOfLines={1}>
            {formattedEvent.title}
          </Text>
          <Text type="p3" numberOfLines={2}>
            {formattedEvent.start.time} · {formattedEvent.location}
          </Text>
        </View>
      </View>

      {!hasEventPassed && (
        <Icon size={20} name="arrow-right-s-line" color={tw.color("primary")} />
      )}
    </TouchableOpacity>
  );
};

export default Event;
