/*
 * Created on Mon Aug 07 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import classNames from "classnames";
import Icon from "react-native-remix-icon";
import { TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  size?: keyof typeof sizeClasses;
  color?: keyof typeof colorClasses;
  style?: any;
  loading?: boolean;
  disabled?: boolean;
  iconLeft?: string; // TODO: Add proper icon name support
  iconRight?: string; // TODO: Add proper icon name support
  children?: React.ReactNode;
}

const sizeClasses = {
  sm: classNames(),
  lg: classNames(),
};

const colorClasses = {
  primary: {
    container: classNames(),
    text: classNames(),
  },
  secondary: {
    container: classNames(),
    text: classNames(),
  },
};

const Button: React.FC<ButtonProps> = () => {
  return <></>;
};

export default Button;
