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

import { TouchableOpacity, View, ViewProps } from "react-native";

import Text from "@/ui/Text";
import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";
import { formatEvent } from "@/lib/util/format";

interface EventAttachmentProps extends ViewProps {
  event: Event;
  style?: any;
  disabled?: boolean;
  onPress?: (event: Event) => void;
}

const EventAttachment: React.FC<EventAttachmentProps> = ({
  event,
  style,
  onPress,
  disabled,
  ...props
}) => {
  const formattedEvent = formatEvent(event);

  const handlePress = () => {
    if (onPress) {
      onPress(event);
    }
  };

  const containerStyles = tw.style(
    "p-3 gap-3 flex-row items-center w-[200px]",
    "bg-slate-100 border border-slate-200 rounded-xl",
    style,
  );

  return (
    <View style={containerStyles} {...props}>
      <Icon size={24} name="calendar-2-fill" color={tw.color("primary")} />

      <View style={tw`shrink`}>
        <Text style={tw`text-primary`}>{event.title}</Text>

        <Text type="p4" style={tw`text-slate-500`} numberOfLines={1}>
          {formattedEvent.start.time} · {formattedEvent.location}
        </Text>
      </View>

      <TouchableOpacity
        style={tw`absolute -top-3.5 -right-3.5 rounded-full p-2`}
        onPress={handlePress}
      >
        <View style={tw`bg-slate-500 rounded-full p-0.5`}>
          <Icon name="close-line" size={14} color={tw.color("white")} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EventAttachment;
