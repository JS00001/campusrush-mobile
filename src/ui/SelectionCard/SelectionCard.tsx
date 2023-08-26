/*
 * Created on Sat Aug 19 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { TouchableOpacity } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface SelectionCardProps {
  // Whether or not the card is selected
  selected?: boolean;
  // Default content
  title?: string;
  description?: string;
  subtitle?: string;
  // Action items
  pressable?: boolean;
  onPress?: () => void;
  // Children
  children?: React.ReactNode;
  hideChildrenWhenUnselected?: boolean;
  // Styling
  style?: any;
}

const SelectionCard: React.FC<SelectionCardProps> = ({
  selected,
  title,
  description,
  subtitle,
  pressable = true,
  onPress,
  children,
  hideChildrenWhenUnselected,
  style,
}) => {
  // If hideChildrenWhenUnselected is true, then we don't want to render the children when the card is unselected
  const ChildrenComponent = hideChildrenWhenUnselected
    ? selected
      ? children
      : null
    : children;

  // Styling
  const containerClasses = tw.style(
    // Default styling for all variants
    "p-4 gap-y-2 rounded-md w-full",
    // Set background color based on selected state
    selected ? "bg-white" : "bg-slate-100",
    // Set border color based on selected state
    selected ? "border border-primary" : "border border-transparent",
    // If the style prop is passed in, then apply it
    style,
  );

  return (
    <TouchableOpacity
      style={containerClasses}
      onPress={onPress}
      disabled={!pressable}
    >
      {/* Title */}
      {title && (
        <Text variant="body" style={tw`text-primary`}>
          {title}
        </Text>
      )}

      {/* Description */}
      {description && (
        <Text variant="text" style={tw`text-slate-500`}>
          {description}
        </Text>
      )}

      {/* Subtitle */}
      {subtitle && (
        <Text variant="body" style={tw`text-primary`}>
          {subtitle}
        </Text>
      )}

      {/* Children */}
      {ChildrenComponent}
    </TouchableOpacity>
  );
};

export default SelectionCard;
