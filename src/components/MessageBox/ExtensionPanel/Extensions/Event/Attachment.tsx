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
  Animated,
  Image,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import { useEffect, useRef } from "react";

import Text from "@/ui/Text";
import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";
import AppConstants from "@/constants";
import useWebsiteMetadata from "@/hooks/useWebsiteMetadata";

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
  const LOADING_CARD_HEIGHT = 64;
  const PREVIEW_CARD_HEIGHT = 144;
  const EVENT_URL = `${AppConstants.eventUrl}/${event._id}`;

  /**
   * Fetch the metadata for the URL
   */
  const query = useWebsiteMetadata(EVENT_URL);

  // If there is a cached value, we dont want the card to wierdly animate
  const initialHeight = query.isFetched
    ? PREVIEW_CARD_HEIGHT
    : LOADING_CARD_HEIGHT;

  const height = useRef(new Animated.Value(initialHeight));

  /**
   * When the isLoading changes, we want to animate the height of the container
   * so the transition from loader to content is smooth
   */
  useEffect(() => {
    Animated.timing(height.current, {
      toValue: query.isLoading ? LOADING_CARD_HEIGHT : PREVIEW_CARD_HEIGHT,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [query.isLoading]);

  /**
   * On press, remove the attachment
   */
  const handlePress = () => {
    if (onPress) {
      onPress(event);
    }
  };

  const containerStyles = tw.style(
    "w-56 rounded-lg bg-slate-100",
    { maxHeight: height.current },
    style,
  );

  if (query.isLoading) {
    return (
      <Animated.View style={containerStyles}>
        <View style={tw`w-full h-full justify-center items-center`}>
          <ActivityIndicator size="small" />
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={containerStyles} {...props}>
      <View style={tw`w-full h-20 rounded-t-lg overflow-hidden`}>
        <Image style={tw`w-full h-full`} src={query.image} />
      </View>

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
        onPress={handlePress}
      >
        <View style={tw`bg-slate-500 rounded-full p-0.5`}>
          <Icon name="close-line" size={14} color={tw.color("white")} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default EventAttachment;
