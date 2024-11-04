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

import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";

import Text from "@/ui/Text";
import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";
import useWebsiteMetadata from "@/hooks/useWebsiteMetadata";

interface EventAttachmentProps extends ViewProps {
  event: string;
  onRemove?: () => void;
}

const EventAttachment: React.FC<EventAttachmentProps> = ({
  event,
  onRemove,
  ...props
}) => {
  const EVENT_URL = event;

  /**
   * Fetch the metadata for the URL
   */
  const query = useWebsiteMetadata(EVENT_URL);

  /**
   * On press, remove the attachment
   */
  const handleRemovePress = () => {
    onRemove?.();
  };

  const containerStyles = tw.style("w-56 rounded-lg bg-gray-100", "h-15");

  if (query.isLoading) {
    return (
      <View style={containerStyles}>
        <View style={tw`w-full h-full justify-center items-center`}>
          <ActivityIndicator size="small" />
        </View>
      </View>
    );
  }

  return (
    <View style={containerStyles} {...props}>
      <View style={tw`p-2`}>
        <Text type="p4" style={tw`text-primary font-medium`} numberOfLines={2}>
          {query.title || "No title found"}
        </Text>
        <Text type="p5" numberOfLines={1}>
          {query.rawUrl}
        </Text>
      </View>

      <TouchableOpacity
        style={tw`absolute -top-3.5 -right-3.5 rounded-full p-2`}
        onPress={handleRemovePress}
      >
        <View style={tw`bg-gray-500 rounded-full p-0.5`}>
          <Icon name="close-line" size={14} color={tw.color("white")} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EventAttachment;
