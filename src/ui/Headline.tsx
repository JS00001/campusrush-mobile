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

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface HeadlineProps extends ViewProps {
  title: string;
  subtitle: string;
  style?: any;
}

const Headline: React.FC<HeadlineProps> = ({
  title,
  subtitle,
  style,
  ...props
}) => {
  const containerStyles = tw.style("flex-col gap-y-1", style);

  return (
    <View style={containerStyles} {...props}>
      <Text type="h2">{title}</Text>
      <Text type="p2">{subtitle}</Text>
    </View>
  );
};

export default Headline;
