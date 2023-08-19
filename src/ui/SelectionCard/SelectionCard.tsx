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

import tw from "@/lib/tailwind";
import Text from "@/ui/Text";

interface SelectionCardProps {
  selected: boolean;
  title?: string;
  description?: string;
  subtitle?: string;
  children?: React.ReactNode;
  hideChildrenWhenUnselected?: boolean;
  onPress: () => void;
}

const SelectionCard: React.FC<SelectionCardProps> = ({
  selected,
  title,
  description,
  subtitle,
  children,
  hideChildrenWhenUnselected,
  onPress,
}) => {
  const ChildrenComponent = hideChildrenWhenUnselected ? null : children;

  // Styling
  const containerClasses = tw.style(
    // Default styling for all variants
    "p-4 gap-y-2 rounded-md w-full",
    // Set background color based on selected state
    selected ? "bg-white" : "bg-slate-100",
    // Set border color based on selected state
    selected ? "border border-primary" : "border border-transparent",
  );

  return (
    <TouchableOpacity style={containerClasses} onPress={onPress}>
      {/* Title */}
      {title && (
        <Text variant="body" style={tw`text-primary`}>
          {title}
        </Text>
      )}

      {/* Description */}
      {description && <Text style={tw`text-slate-500`}>{description}</Text>}

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
