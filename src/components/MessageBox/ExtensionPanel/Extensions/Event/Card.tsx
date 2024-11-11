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

import { TouchableOpacity, View } from "react-native";

import type { IEvent } from "@/types";

import Text from "@/ui/Text";
import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";
import date from "@/lib/util/date";
import format, { FormattedEvent } from "@/lib/util/format";

interface EventCardProps {
  event: IEvent;
  onPress?: (event: IEvent) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  const formattedEvent = format.event(event)!;
  const hasPassed = date.hasPassed(formattedEvent.startDate);

  const containerStyles = tw.style(
    "w-full flex-row items-center gap-3 p-4 pr-6",
    hasPassed && "disabled",
  );

  const onEventPress = () => {
    onPress?.(event);
  };

  return (
    <TouchableOpacity
      disabled={hasPassed}
      style={containerStyles}
      onPress={onEventPress}
    >
      <EventDate event={formattedEvent} />

      <View style={tw`flex-1`}>
        <Text type="p2" style={tw`text-primary`} numberOfLines={1}>
          {formattedEvent.title}
        </Text>
        <Text type="p3" numberOfLines={1}>
          {formattedEvent.location}
        </Text>
      </View>

      <Icon icon="Plus" size={20} />
    </TouchableOpacity>
  );
};

const EventDate: React.FC<{ event: FormattedEvent }> = ({ event }) => {
  const containerStyles = tw.style(
    "h-10 w-10 items-center justify-center",
    "bg-white shadow rounded-md",
  );

  return (
    <View style={containerStyles}>
      <Text type="p4">{event.start.month}</Text>
      <Text type="p4" style={tw`text-primary font-bold`}>
        {event.start.day}
      </Text>
    </View>
  );
};

export default EventCard;
