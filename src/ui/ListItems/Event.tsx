/*
 * Created on Mon Nov 11 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";

import type { IEvent } from "@/types";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import IconLabel from "@/ui/IconLabel";
import { useBottomSheet } from "@/providers/BottomSheet";

interface EventProps {
  event: IEvent;
}

const Event: React.FC<EventProps> = ({ event }) => {
  const { openBottomSheet } = useBottomSheet();

  const isEventInPast = new Date(event.startDate) < new Date();

  // Format start to: Month Day
  const startDate = new Date(event.startDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  // Format start to: HH:MM AM/PM
  const startTime = new Date(event.startDate).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  // Calculate days until event, or days since event
  const daysUntilEventText = useMemo(() => {
    const millisecondsInDay = 1000 * 60 * 60 * 24;

    const today = new Date();
    const eventDate = new Date(event.startDate);
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    const daysUntilEvent = Math.floor(
      (eventDate.getTime() - today.getTime()) / millisecondsInDay,
    );

    if (daysUntilEvent === 0) return "Today";
    if (daysUntilEvent === 1) return "Tomorrow";
    if (daysUntilEvent === -1) return "Yesterday";

    return daysUntilEvent > 0
      ? `In ${daysUntilEvent} days`
      : `${-daysUntilEvent} days ago`;
  }, [event.startDate]);

  const onPress = () => {
    openBottomSheet("EVENT", { event });
  };

  const containerStyles = tw.style(
    "flex-col gap-1.5",
    "p-5 rounded-xl relative bg-gray-100",
    isEventInPast && "disabled",
  );

  const textStyles = tw.style(
    !isEventInPast && "text-gray-500",
    isEventInPast && "text-red-500",
  );

  const yesResponseContainerStyles = tw.style(
    "px-2 py-1 rounded-lg self-start",
    "bg-green-50 border border-green-600/20",
  );

  const maybeResponseContainerStyles = tw.style(
    "px-2 py-1 rounded-lg self-start",
    "bg-yellow-50 border border-yellow-600/20",
  );

  const noResponseContainerStyles = tw.style(
    "px-2 py-1 rounded-lg self-start",
    "bg-red-50 border border-red-600/20",
  );

  return (
    <TouchableOpacity onPress={onPress} style={containerStyles}>
      <Text type="p3" style={textStyles}>
        {startDate} · {startTime} · {daysUntilEventText}
      </Text>

      <Text type="h3" numberOfLines={1}>
        {event.title}
      </Text>

      {/* Details */}
      <View style={tw`gap-2`}>
        <IconLabel
          size="sm"
          color="tertiary"
          title={event.location}
          iconName="map-pin-fill"
        />
        <IconLabel
          size="sm"
          color="tertiary"
          title={event.description}
          iconName="information-2-fill"
        />
      </View>

      {/* Responses */}
      <View style={tw`gap-1 pt-2 flex-row `}>
        <View style={yesResponseContainerStyles}>
          <Text style={tw`text-xs text-green-700`}>
            {event.responses.yes} · Yes
          </Text>
        </View>

        <View style={maybeResponseContainerStyles}>
          <Text style={tw`text-xs text-yellow-700`}>
            {event.responses.maybe} · Maybe
          </Text>
        </View>

        <View style={noResponseContainerStyles}>
          <Text type="p4" style={tw`text-red-700`}>
            {event.responses.no} · No
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Event;
