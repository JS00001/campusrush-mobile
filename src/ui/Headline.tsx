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
  centerText?: boolean;
  style?: any;
  titleStyle?: any;
  subtitleStyle?: any;
}

const Headline: React.FC<HeadlineProps> = ({
  title,
  subtitle,
  centerText,
  style,
  titleStyle,
  subtitleStyle,

  ...props
}) => {
  const containerStyles = tw.style(centerText && "items-center", style);
  const textStyles = tw.style(centerText && "text-center");
  const titleStyles = tw.style(textStyles, titleStyle);
  const subtitleStyles = tw.style(textStyles, subtitleStyle);

  return (
    <View style={containerStyles} {...props}>
      <Text type="h4" style={titleStyles} numberOfLines={1}>
        {title}
      </Text>
      <Text type="p3" style={subtitleStyles}>
        {subtitle}
      </Text>
    </View>
  );
};

export default Headline;
