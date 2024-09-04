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

import { Image } from "expo-image";
import { TouchableOpacity, View, ViewProps } from "react-native";

import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";

export type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps extends ViewProps {
  url?: string;
  size?: AvatarSize;
  editable?: boolean;
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
  contentRing,
  size = "md",
  editable,
  onPress,
  ...props
}) => {
  const iconSize = AvatarSizes[size].icon;

  const containerStyles = tw.style(
    "rounded-full",
    "bg-slate-100",
    "items-center justify-center",
    { width: AvatarSizes[size].container },
    { height: AvatarSizes[size].container },
    contentRing && "border-4 border-white",
    style,
  );

  const editContainerStyles = tw.style(
    "items-center justify-center",
    "bg-slate-100 absolute bottom-0 right-0",
    "border-white rounded-full border-2",
    { width: AvatarSizes[size].editContainer },
    { height: AvatarSizes[size].editContainer },
  );

  return (
    <TouchableOpacity
      style={containerStyles}
      disabled={!onPress}
      onPress={onPress}
      {...props}
    >
      {url && (
        <Image
          source={{ uri: url }}
          style={tw`rounded-full w-full h-full`}
          contentFit="cover"
        />
      )}
      {!url && (
        <Icon name="user-fill" size={iconSize} color={tw.color("slate-400")} />
      )}
      {editable && (
        <View style={editContainerStyles}>
          <Icon
            name="edit-2-line"
            size={AvatarSizes[size].editIcon}
            color={tw.color("primary")}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Avatar;
