/*
 * Created on Tue Jul 30 2024
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

import tw from "@/lib/tailwind";

interface InvisibleWrapperProps extends ViewProps {
  visible: boolean;
  style?: any;
}

const InvisibleWrapper: React.FC<InvisibleWrapperProps> = ({
  visible,
  style,
  ...props
}) => {
  const styles = visible ? tw`opacity-100` : tw`opacity-0 h-0 w-0`;
  const events = visible ? "auto" : ("none" as any);

  return <View pointerEvents={events} style={[styles, style]} {...props} />;
};

export default InvisibleWrapper;
