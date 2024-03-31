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

import tw from "@/lib/tailwind";
import { SwitchProps as RNSwitchProps, Switch as RNSwitch } from "react-native";

interface SwitchProps extends RNSwitchProps {}

const Switch: React.FC<SwitchProps> = ({ ...props }) => {
  return <RNSwitch {...props} trackColor={{ true: tw.color("primary") }} />;
};

export default Switch;
