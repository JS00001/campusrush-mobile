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

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import date from "@/lib/util/date";
import Skeleton from "@/ui/Skeleton";
import format from "@/lib/util/format";
import EventDate from "@/ui/Event/Date";

interface EventCardProps extends Omit<TouchableOpacityProps, "onPress"> {
  event: Event;
  style?: any;
  onPress?: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  style,
  onPress,
  disabled,
  ...props
}) => {
  const formattedEvent = format.event(event);
  const hasPassed = date.hasPassed(formattedEvent.startDate);

  const containerStyles = tw.style(
    "bg-slate-100 border border-slate-200 shadow w-[228px] p-4 rounded-xl gap-5",
    "flex-row items-center ",
    hasPassed && "disabled",
    style,
  );

  const onEventPress = () => {
    if (onPress) {
      onPress(event);
      return;
    }
  };

  return (
    <TouchableOpacity
      disabled={hasPassed}
      style={containerStyles}
      onPress={onEventPress}
    >
      <EventDate
        month={formattedEvent.start.month}
        day={formattedEvent.start.day}
        weekday={formattedEvent.start.weekday}
      />

      <View style={tw`shrink`}>
        <Text style={tw`font-semibold text-primary`} numberOfLines={1}>
          {event.title}
        </Text>
        <Text type="p4" style={tw`text-slate-500`} numberOfLines={2}>
          {formattedEvent.start.time} · {formattedEvent.location}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const EventCardLoader = () => {
  const containerClasses = tw.style(
    "bg-slate-100 border border-slate-200 shadow w-[228px] p-4 rounded-lg gap-5",
    "flex-row items-center h-full",
  );

  return (
    <View style={containerClasses}>
      {/* Date and Time */}
      <Skeleton width="w-16" height="h-18" />

      {/* Information */}
      <View style={tw`flex-1 gap-y-2`}>
        <Skeleton height="h-6" />
        <Skeleton height="h-4" />
      </View>
    </View>
  );
};

export default EventCard;
