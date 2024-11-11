/*
 * Created on Tue Sep 03 2024
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
import { Image } from "expo-image";

import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";

export type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps extends ViewProps {
  url?: string;
  size?: AvatarSize;
  editable?: boolean;
  loading?: boolean;
  contentRing?: boolean;
  onPress?: () => void;
  style?: any;
}

/**
 * The size of the Avatar
 */
const AvatarSizes = {
  sm: {
    container: 60,
    icon: 26,
    editContainer: 18,
    editIcon: 10,
  },
  md: {
    container: 80,
    icon: 32,
    editContainer: 24,
    editIcon: 14,
  },
  lg: {
    container: 120,
    icon: 50,
    editContainer: 36,
    editIcon: 20,
  },
};

const Avatar: React.FC<AvatarProps> = ({
  url,
  style,
  loading,
  contentRing,
  size = "md",
  editable,
  onPress,
  ...props
}) => {
  const disabled = !onPress || loading;
  const iconSize = AvatarSizes[size].icon;

  const containerStyles = tw.style(
    "rounded-full",
    "bg-gray-100",
    "items-center justify-center",
    { width: AvatarSizes[size].container },
    { height: AvatarSizes[size].container },
    contentRing && "border-4 border-white",
    style,
  );

  const editContainerStyles = tw.style(
    "items-center justify-center z-20",
    "bg-gray-100 absolute bottom-0 right-0",
    "border-white rounded-full border-2",
    { width: AvatarSizes[size].editContainer },
    { height: AvatarSizes[size].editContainer },
  );

  const loadingOverlayStyles = tw.style(
    "flex items-center justify-center",
    "absolute inset-0 z-10",
    "rounded-full bg-black bg-opacity-75",
  );

  return (
    <TouchableOpacity
      style={containerStyles}
      disabled={disabled}
      onPress={onPress}
      {...props}
    >
      {loading && (
        <View style={loadingOverlayStyles}>
          <ActivityIndicator color={tw.color("white")} />
        </View>
      )}

      {url && (
        <Image
          source={{ uri: url }}
          style={tw`rounded-full w-full h-full`}
          contentFit="cover"
        />
      )}

      {!url && (
        <Icon icon="UserFill" size={iconSize} color={tw.color("gray-400")} />
      )}

      {editable && (
        <View style={editContainerStyles}>
          <Icon icon="PencilLine" size={AvatarSizes[size].editIcon} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Avatar;
