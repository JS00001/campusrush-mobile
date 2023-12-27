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
import tw from "@/lib/tailwind";
import date from "@/lib/util/date";
import { formatEvent } from "@/lib/util/format";
import { useBottomSheets } from "@/providers/BottomSheet";

interface EventProps {
  event: Event;
}

const Event: React.FC<EventProps> = ({ event }) => {
  const { handlePresentModalPress } = useBottomSheets();

  const formattedEvent = formatEvent(event);
  const hasPassed = date.hasPassed(formattedEvent.startDate);

  const containerClasses = tw.style(
    "bg-slate-100 w-full p-4 rounded-md gap-6",
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
      disabled={hasPassed}
      style={containerClasses}
      onPress={onPress}
    >
      <View style={tw`flex-row gap-5 flex-shrink`}>
        {/* Date and Time */}
        <EventDate
          month={formattedEvent.start.month}
          day={formattedEvent.start.day}
          weekday={formattedEvent.start.weekday}
        />

        {/* Information */}
        <View>
          <Text variant="title">{event.title}</Text>
          <Text variant="text" style={tw`text-slate-500`}>
            {formattedEvent.start.time} · {formattedEvent.location}
          </Text>
        </View>
      </View>

      {/* Chevron (is clickable if the event has not passed) */}
      {!hasPassed && (
        <RemixIcon
          size={20}
          name="ri-arrow-right-s-line"
          color={tw.color("primary")}
        />
      )}
    </TouchableOpacity>
  );
};

interface EventDateProps {
  month: string;
  day: string;
  weekday: string;
}

const EventDate: React.FC<EventDateProps> = ({ month, day, weekday }) => {
  const containerClasses = tw.style(
    "bg-white border border-slate-200 shadow-sm",
    "pt-1 rounded-lg items-center",
  );

  return (
    <View style={containerClasses}>
      <Text style={tw`text-[10px] text-slate-500 uppercase leading-4`}>
        {month}
      </Text>

      <Text variant="title" style={tw`leading-6`}>
        {day}
      </Text>

      <View
        style={tw`px-4.5 py-0.5 bg-slate-100 rounded-b-lg mt-0.5 border-t border-slate-200`}
      >
        <Text style={tw`text-[10px] text-slate-500 uppercase`}>{weekday}</Text>
      </View>
    </View>
  );
};

export default Event;
