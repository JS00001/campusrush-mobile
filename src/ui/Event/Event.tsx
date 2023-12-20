/*
 * Created on Wed Dec 20 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import RemixIcon from "react-native-remix-icon";
import { TouchableOpacity, View } from "react-native";

import Text from "@/ui/Text";
import date from "@/lib/date";
import Badge from "@/ui/Badge";
import tw from "@/lib/tailwind";
import { useBottomSheets } from "@/providers/BottomSheet";

interface EventProps {
  event: Event;
}

const Event: React.FC<EventProps> = ({ event }) => {
  const { handlePresentModalPress } = useBottomSheets();

  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);

  // Extract the day like "December 3rd" from the start date
  const day = startDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Extract the time range like "3:00 PM - 5:00 PM" from the start and end dates
  const timeRange = `${startDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
  })} - ${endDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
  })}`;

  // Get the time until the event starts
  // prettier-ignore
  const { hasPassed, isOneDayAway, formattedDateString } = date.timeUntil(startDate);

  // Make the color more visible if the event is one day away or less
  const badgeColor = isOneDayAway ? "bg-yellow-500" : "bg-slate-400";

  // Styling
  const containerClasses = tw.style(
    // Default classes
    "bg-slate-100 w-full p-4 rounded-md gap-6",
    // Add justify for timestamp
    "flex-row justify-between items-center",
    // Add opacity if event has passed
    hasPassed && "opacity-50",
  );

  const onPress = () => {
    handlePresentModalPress("EVENT", {
      event: event,
    });
  };

  return (
    <TouchableOpacity
      style={containerClasses}
      onPress={onPress}
      disabled={hasPassed}
    >
      <View style={tw`flex-row gap-5 flex-shrink`}>
        {/* Badge */}
        <Badge style={tw`self-start mt-1 w-18 px-1 ${badgeColor}`}>
          {formattedDateString}
        </Badge>

        {/* Information */}
        <View style={tw`gap-y-2`}>
          <Text variant="body" style={tw`text-primary`}>
            {event.title}
          </Text>

          <EventDetail icon="ri-calendar-line">{day}</EventDetail>
          <EventDetail icon="ri-time-line">{timeRange}</EventDetail>
        </View>
      </View>

      {/* Chevron */}
      {!hasPassed && (
        <RemixIcon
          name="ri-arrow-right-s-line"
          size={20}
          color={tw.color("primary")}
        />
      )}
    </TouchableOpacity>
  );
};

interface EventDetailProps {
  icon: string;
  children: React.ReactNode;
}

const EventDetail: React.FC<EventDetailProps> = ({ icon, children }) => {
  return (
    <View style={tw`flex-row items-center gap-1`}>
      <RemixIcon name={icon} size={14} color={tw.color("slate-500")} />
      <Text variant="subtext" style={tw`text-slate-500`}>
        {children}
      </Text>
    </View>
  );
};

export default Event;
