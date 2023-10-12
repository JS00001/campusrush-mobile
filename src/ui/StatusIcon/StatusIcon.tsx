/*
 * Created on Sun Oct 8 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import React from "react";
import { View } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface StatusIconProps {
  children: React.ReactNode;
}

interface StatusIconComponents {
  Icon: React.FC<IconProps>;
  Text: React.FC<TextProps>;
}

const StatusIcon: React.FC<StatusIconProps> & StatusIconComponents = ({
  children,
}) => {
  // The header component if passed
  const Icon = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement(child) &&
      (child as any).type.displayName == "StatusIcon.Icon",
  );

  // The footer component if passed
  const Text = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement(child) &&
      (child as any).type.displayName == "StatusIcon.Text",
  );

  // Styling
  const containerClasses = tw.style(
    // Sizing and positioning
    "w-full h-full z-20 absolute items-center justify-center",
    // Colors
    "bg-black bg-opacity-10",
  );

  const contentContainerClasses = tw.style(
    // All styling
    "bg-black w-36 h-36 items-center justify-center rounded-xl bg-opacity-60 mt-36 gap-2",
  );

  return (
    <View style={containerClasses}>
      <View style={contentContainerClasses}>
        {Icon}
        {Text}
      </View>
    </View>
  );
};

interface IconProps {
  children: React.ReactNode;
}

const Icon: React.FC<IconProps> = ({ children }) => {
  return <>{children}</>;
};

interface TextProps {
  children: React.ReactNode;
}

const StatusIconText: React.FC<TextProps> = ({ children }) => {
  return (
    <Text style={tw`text-white`} variant="title">
      {children}
    </Text>
  );
};

/**
 * StatusIcon Sub-Components
 *
 * These are the sub-components that make up the StatusIcon.
 * They each need to have a displayName so that they can be
 * accessed from the StatusIcon component.
 *
 * Example:
 *  StatusIcon.Icon = Icon
 *  StatusIcon.Text = Text
 *  ...
 *
 * Make sure they are assigned to the StatusIcon component
 *
 * Example:
 *  StatusIcon.Icon = Icon
 *  StatusIcon.Text = Text
 * ...
 */

Icon.displayName = "StatusIcon.Icon";
StatusIcon.Icon = Icon;

StatusIcon.Text = StatusIconText;
StatusIcon.Text.displayName = "StatusIcon.Text";

export default StatusIcon;
