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
  type?: "card" | "attachment";
  onPress?: (event: Event) => void;
}

const Event: React.FC<EventProps> = ({ event, type, onPress }) => {
  switch (type) {
    case "card":
      return <CardEvent event={event} onPress={onPress} />;
    case "attachment":
      return <AttachmentEvent event={event} onPress={onPress} />;
    default:
      return <DefaultEvent event={event} onPress={onPress} />;
  }
};

/**
 * The default event card in the events list. This will open a bottom sheet
 * allowing for sharing and editing, if the onPress prop is not provided.
 */
const DefaultEvent: React.FC<EventProps> = ({ event, onPress }) => {
  const { handlePresentModalPress } = useBottomSheets();

  const formattedEvent = formatEvent(event);
  const hasPassed = date.hasPassed(formattedEvent.startDate);

  const containerClasses = tw.style(
    "bg-slate-100 w-full p-4 rounded-lg gap-6",
    "flex-row justify-between items-center",
    // Add opacity if event has passed
    hasPassed && "opacity-50",
  );

  const onEventPress = () => {
    if (onPress) {
      onPress(event);
      return;
    }

    handlePresentModalPress("EVENT", {
      event: event,
    });
  };

  return (
    <TouchableOpacity
      disabled={hasPassed}
      style={containerClasses}
      onPress={onEventPress}
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

/**
 * The attachment event in the chat message composer.
 */
const AttachmentEvent: React.FC<EventProps> = ({ event, onPress }) => {
  const formattedEvent = formatEvent(event);

  const containerClasses = tw.style(
    "p-3 gap-3 flex-row items-center w-[200px]",
    "bg-slate-100 border border-slate-200 rounded-lg",
  );

  const onEventPress = () => {
    if (onPress) {
      onPress(event);
      return;
    }
  };

  return (
    <View style={containerClasses}>
      <RemixIcon
        name="ri-calendar-2-fill"
        size={24}
        color={tw.color("primary")}
      />

      <View style={tw`shrink`}>
        <Text variant="body" style={tw`text-primary`}>
          {event.title}
        </Text>

        <Text variant="subtext" style={tw`text-slate-500`} numberOfLines={1}>
          {formattedEvent.start.time} · {formattedEvent.location} is long
        </Text>
      </View>

      <TouchableOpacity
        style={tw`absolute -top-3.5 -right-3.5 rounded-full p-2`}
        onPress={onEventPress}
      >
        <View style={tw`bg-slate-500 rounded-full p-0.5`}>
          <RemixIcon name="ri-close-line" size={14} color={tw.color("white")} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

/**
 * The card event in the event details screen. This is for sharing
 * in chats and other places where we want to just attach the event "on press".
 */
const CardEvent: React.FC<EventProps> = ({ event, onPress }) => {
  const formattedEvent = formatEvent(event);
  const hasPassed = date.hasPassed(formattedEvent.startDate);

  const containerClasses = tw.style(
    "bg-slate-100 border border-slate-200 shadow w-[228px] p-4 rounded-lg gap-5",
    "flex-row items-center ",
    // Add opacity if event has passed
    hasPassed && "opacity-50",
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
      style={containerClasses}
      onPress={onEventPress}
    >
      {/* Date and Time */}
      <EventDate
        month={formattedEvent.start.month}
        day={formattedEvent.start.day}
        weekday={formattedEvent.start.weekday}
      />

      {/* Information */}
      <View style={tw`shrink`}>
        <Text
          variant="body"
          style={tw`font-semibold text-primary`}
          numberOfLines={1}
        >
          {event.title}
        </Text>
        <Text variant="subtext" style={tw`text-slate-500`} numberOfLines={2}>
          {formattedEvent.start.time} · {formattedEvent.location}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

/**
 * The "Calendar" looking component that displays the month,
 * day, and weekday of an event.
 */
interface EventDateProps {
  month: string;
  day: string;
  weekday: string;
}

const EventDate: React.FC<EventDateProps> = ({ month, day, weekday }) => {
  const containerClasses = tw.style(
    "bg-white border border-slate-200 shadow",
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
