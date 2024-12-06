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

import {
  View,
  Switch as RNSwitch,
  SwitchProps as RNSwitchProps,
} from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import { useRef } from "react";

interface SwitchProps extends RNSwitchProps {
  label?: string;
}

const Switch: React.FC<SwitchProps> = ({ label, style, ...props }) => {
  const switchRef = useRef<RNSwitch>(null);

  const switchStyles = tw.style({
    transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }],
  });

  return (
    <View style={tw`flex-row items-center gap-2`}>
      <RNSwitch
        {...props}
        ref={switchRef}
        style={[switchStyles, style]}
        trackColor={{ true: tw.color("primary") }}
      />

      {label && <Text>{label}</Text>}
    </View>
  );
};

export default Switch;
