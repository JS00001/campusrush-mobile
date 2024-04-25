/*
 * Created on Sun Apr 14 2024
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
  Linking,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef } from "react";
import { TouchableOpacityProps, View } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import useWebsiteMetadata from "@/hooks/useWebsiteMetadata";

interface WebsitePreviewProps extends TouchableOpacityProps {
  url: string;
  style?: any;
}

const WebsitePreview: React.FC<WebsitePreviewProps> = ({
  url,
  style,
  ...props
}) => {
  const LOADING_CARD_HEIGHT = 64;
  const PREVIEW_CARD_HEIGHT = 212;

  /**
   * Fetch the metadata for the URL
   */
  const query = useWebsiteMetadata(url);

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

  const onClick = () => {
    Linking.openURL(url);
  };

  const containerStyles = tw.style(
    "w-3/4 rounded-xl overflow-hidden bg-gray-100",
    style,
  );

  const { image, title, rawUrl } = query;

  if (query.isLoading) {
    return (
      <Animated.View style={[containerStyles, { maxHeight: height.current }]}>
        <View style={tw`w-full h-full justify-center items-center`}>
          <ActivityIndicator size="small" />
        </View>
      </Animated.View>
    );
  }

  return (
    <TouchableOpacity style={containerStyles} onPress={onClick} {...props}>
      <Animated.View style={{ maxHeight: height.current }}>
        {image && (
          <View style={tw`w-full h-32`}>
            <Image style={tw`w-full h-full`} src={image} />
          </View>
        )}

        <View style={tw`p-2.5`}>
          <Text
            type="p3"
            style={tw`text-primary font-semibold`}
            numberOfLines={2}
          >
            {title || "No title found"}
          </Text>
          <Text type="p4" numberOfLines={1}>
            {rawUrl}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default WebsitePreview;
