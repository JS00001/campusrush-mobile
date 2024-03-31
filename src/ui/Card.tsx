/*
 * Created on Sun Mar 24 2024
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

interface CardProps extends ViewProps {
  style?: any;
}

const Card: React.FC<CardProps> = ({ style, children, ...props }) => {
  const cardStyles = tw.style("rounded-xl p-4 bg-slate-100 w-full", style);

  return (
    <View style={cardStyles} {...props}>
      {children}
    </View>
  );
};

export default Card;
