/*
 * Created on Fri Mar 15 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { TouchableOpacityProps } from "react-native";

export type EventType = "card" | "attachment";

interface EventProps extends Omit<TouchableOpacityProps, "onPress"> {
  event: Event;
  type?: EventType;
  style?: any;
  onPress?: (event: Event) => void;
}

const Event: React.FC<EventProps> = ({
  event,
  type = "card",
  style,
  onPress,
  ...props
}) => {
  return <></>;
};

export default Event;
