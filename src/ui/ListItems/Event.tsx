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

import { TouchableOpacity, View } from "react-native";

import type { IEvent } from "@/types";

import Text from "@/ui/Text";
import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";
import IconLabel from "@/ui/IconLabel";
import StatusBadge from "@/ui/StatusBadge";
import { useBottomSheetStore } from "@/store";

interface EventProps {
  event: IEvent;
}

const Event: React.FC<EventProps> = ({ event }) => {
  const bottomSheetStore = useBottomSheetStore();

  const isEventInPast = new Date(event.startDate) < new Date();

  // Format start to: HH:MM AM/PM
  const startTime = new Date(event.startDate).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const onPress = () => {
    bottomSheetStore.open("EVENT", { event });
  };

  const containerStyles = tw.style(
    "flex-row gap-2 justify-between items-center",
    "p-5 rounded-xl relative bg-gray-100",
  );

  const textStyles = tw.style(
    !isEventInPast && "text-gray-500",
    isEventInPast && "text-red-500",
  );

  return (
    <TouchableOpacity onPress={onPress} style={containerStyles}>
      <View style={tw`gap-2 shrink`}>
        <View>
          <Text type="p3" style={textStyles}>
            Starts at {startTime}
          </Text>
          <Text type="h4" numberOfLines={1}>
            {event.title}
          </Text>
        </View>

        {/* Details */}
        <View style={tw`gap-2`}>
          <IconLabel
            size="sm"
            color="tertiary"
            subtitle={event.location}
            iconName="MapPinSimple"
          />
          <IconLabel
            size="sm"
            color="tertiary"
            subtitle={event.description}
            iconName="Info"
          />
        </View>

        {/* Responses */}
        <View style={tw`gap-1 pt-2 flex-row `}>
          <StatusBadge color="success">{event.responses.yes} · Yes</StatusBadge>
          <StatusBadge color="warning">
            {event.responses.maybe} · Maybe
          </StatusBadge>
          <StatusBadge color="danger">{event.responses.no} · No</StatusBadge>
        </View>
      </View>

      <Icon size={16} icon="CaretRight" />
    </TouchableOpacity>
  );
};

export default Event;
