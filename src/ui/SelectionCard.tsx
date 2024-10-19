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
  View,
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import Text from "@/ui/Text";
import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";

interface SelectionCardProps extends TouchableOpacityProps {
  selected: boolean;
  title: string;
  subtitle: string;
  description: string;
  pressable?: boolean;
  style?: any;
  loading?: boolean;
  hideChildrenWhenUnselected?: boolean;
}

const SelectionCard: React.FC<SelectionCardProps> = ({
  selected,
  title,
  subtitle,
  description,
  pressable = true,
  style,
  loading,
  children,
  disabled,
  onPress,
  hideChildrenWhenUnselected,
  ...props
}) => {
  const label = props["ph-label"] || `selection-card-"${title}"`;
  disabled = disabled || loading;

  const Children = (() => {
    if (!hideChildrenWhenUnselected) {
      return children;
    }

    if (selected) {
      return children;
    }

    return null;
  })();

  const containerStyles = tw.style(
    "p-4 gap-y-2 rounded-xl w-full border",
    selected && "bg-white border-primary",
    !selected && "bg-gray-100 border-transparent",
    disabled && "disabled",
    style,
  );

  const loadingContainerStyles = tw.style(
    "absolute inset-0 items-center justify-center",
  );

  return (
    <TouchableOpacity
      ph-label={label}
      style={containerStyles}
      disabled={!pressable || disabled}
      onPress={onPress}
      {...props}
    >
      {/* Loading indicator if loading */}
      {loading && (
        <View style={loadingContainerStyles}>
          <ActivityIndicator color={tw.color("primary")} />
        </View>
      )}

      {/* Selected icon (checkmark) */}
      {selected && (
        <View style={tw`absolute p-4 right-0`}>
          <Icon
            size={20}
            name="checkbox-circle-fill"
            color={tw.color("primary")}
          />
        </View>
      )}

      {/* Title */}
      <Text style={tw`text-primary`}>{title}</Text>

      {/* Subtitle */}
      <Text>{subtitle}</Text>

      {/* Description */}
      <Text style={tw`text-primary`}>{description}</Text>

      {Children}
    </TouchableOpacity>
  );
};

export default SelectionCard;
