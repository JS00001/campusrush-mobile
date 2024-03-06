/*
 * Created on Wed Mar 06 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { View, ViewProps } from "react-native";

import Icon from "@/ui/Icon";
import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

export type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps extends ViewProps {
  size?: BadgeSize;
  removable?: boolean;
  onRemove?: () => void;
  style?: any;
}

/**
 * The size of the badge
 */
const BadgeSizes = {
  sm: tw.style("py-0.5 px-3"),
  md: tw.style("py-1 px-4"),
  lg: tw.style("py-1.5 px-5"),
};

/**
 * The size of the text in the badge
 */
const BadgeTextSizes = {
  sm: "p4",
  md: "p3",
  lg: "p2",
};

const Badge: React.FC<BadgeProps> = ({
  size = "lg",
  removable = false,
  onRemove,
  style,
  ...props
}) => {
  return <></>;
};

export default Badge;
