/*
 * Created on Tue Oct 17 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import tw from "@/lib/tailwind";
import { View } from "react-native";

interface ButtonGroupProps {
  children: React.ReactNode;
  style?: any;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, style }) => {
  const containerClasses = tw.style(
    "flex flex-row items-center gap-x-2",
    style,
  );

  return <View style={containerClasses}>{children}</View>;
};

export default ButtonGroup;
