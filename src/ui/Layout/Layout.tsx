/*
 * Created on Thu Aug 17 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import {
  View,
  ViewProps,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React from "react";
import Icon from "react-native-remix-icon";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import HeaderSvg from "@/assets/HeaderSvg";
import Badge from "../Badge";

interface LayoutProps extends ViewProps {
  children?: React.ReactNode;
  contentContainerStyle?: any;
  gap?: number;
  keyboardAvoiding?: boolean;
  scrollable?: boolean;
  removePadding?: boolean;
  style?: any;
}

interface LayoutComponents {
  Header: React.FC<HeaderProps>;
  CustomHeader: React.FC<CustomHeaderProps>;
  Footer: React.FC<FooterProps>;
}

const Layout: React.FC<LayoutProps> & LayoutComponents = ({
  style,
  children,
  contentContainerStyle,
  gap = 24,
  removePadding = false,
  scrollable = false,
  keyboardAvoiding = false,
}) => {
  // The header component if passed
  const LayoutHeader = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement(child) &&
      ((child as any).type.displayName == "Layout.Header" ||
        (child as any).type.displayName == "Layout.CustomHeader"),
  );

  // The footer component if passed
  const LayoutFooter = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement(child) &&
      (child as any).type.displayName == "Layout.Footer",
  );

  // Remove the header from the children
  const LayoutChildren = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement(child) &&
      (child as any).type.displayName != "Layout.Header" &&
      (child as any).type.displayName != "Layout.CustomHeader" &&
      (child as any).type.displayName != "Layout.Footer",
  );

  // Styling
  const safeAreaStyles = tw.style(
    // Positioning and color
    "z-10 bg-white flex-1 h-full",
    // Custom styles as provided by the style prop
    style,
  );

  const contentContainerStyles = tw.style(
    // Sizing and positioning
    "w-full items-center px-6 pt-6",
    // If they remove padding, remove it
    removePadding && "px-0 pt-0",
    // If flexGap is provided, add gap style
    gap.toString() && { gap: gap },
    // Custom styles as provided by the style prop
    contentContainerStyle,
  );

  // Get the type of container needed for the content
  const ContentContainerIdentifier =
    scrollable && keyboardAvoiding
      ? "KeyboardAwareScrollView"
      : scrollable
        ? "ScrollView"
        : keyboardAvoiding
          ? "KeyboardAvoidingView"
          : "View";

  // Get the view that should host the content
  const ContentContainer = {
    KeyboardAwareScrollView: (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={contentContainerStyles}
      >
        {LayoutChildren}
      </KeyboardAwareScrollView>
    ),
    ScrollView: (
      <ScrollView
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={contentContainerStyles}
      >
        {LayoutChildren}
      </ScrollView>
    ),
    KeyboardAvoidingView: (
      <KeyboardAvoidingView
        behavior="padding"
        style={contentContainerStyles}
        // contentContainerStyle={contentContainerStyle}
      >
        {LayoutChildren}
      </KeyboardAvoidingView>
    ),
    View: (
      <View style={[contentContainerStyles, tw`flex-1`]}>{LayoutChildren}</View>
    ),
  }[ContentContainerIdentifier];

  return (
    <View style={tw`flex-1 z-10`}>
      {/* If there is a header, render it */}
      {LayoutHeader}

      {/* Render the content/children of the layout */}
      <SafeAreaView style={safeAreaStyles}>
        {/* Render the content container (Automatically adds children) */}
        {ContentContainer}
      </SafeAreaView>

      {/* If there is a footer, render it */}
      {LayoutFooter}
    </View>
  );
};

interface HeaderProps {
  title?: string;
  subtitle?: string;
  beta?: boolean;
  hasBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  beta,
  hasBackButton,
}) => {
  // Allow the header to access navigation
  const navigation = useNavigation();

  // Handle back button press
  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <>
      {/* Background circles */}
      <View style={tw`absolute`}>
        <HeaderSvg />
      </View>

      {/* Content */}
      <View style={tw`px-6 py-8 z-10`}>
        <SafeAreaView style={tw`h-36 flex-col justify-between`}>
          {hasBackButton && (
            <TouchableOpacity
              onPress={onBackPress}
              style={tw`h-10 w-10 rounded-full items-center justify-center bg-navy-100`}
            >
              <Icon name="ri-arrow-left-line" size={22} color="#fff" />
            </TouchableOpacity>
          )}
          {/* This empty view is so the text is always at the bottom */}
          <View style={tw`flex-1`} />

          <View style={tw`gap-y-3`}>
            {beta && (
              <Badge size="md" style={tw`bg-blue-900 py-1`}>
                Beta
              </Badge>
            )}
            <Text variant="header" style={tw`text-white`}>
              {title}
            </Text>
            <Text style={tw`text-gray-300`}>{subtitle}</Text>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

interface CustomHeaderProps {
  children: React.ReactNode;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ children }) => {
  return children;
};

interface FooterProps {
  children: React.ReactNode;
  scrollable?: boolean;
  keyboardAvoiding?: boolean;
}

const Footer: React.FC<FooterProps> = ({
  scrollable,
  keyboardAvoiding,
  children,
}) => {
  // The content container identifier to select the correct layout component
  const ContentContainerIdentifier = scrollable
    ? "ScrollView"
    : keyboardAvoiding
      ? "KeyboardAvoidingView"
      : "View";

  // The options for the content container
  const ContentContainer = {
    ScrollView: (
      <ScrollView
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled"
      >
        <SafeAreaView>{children}</SafeAreaView>
      </ScrollView>
    ),
    KeyboardAvoidingView: (
      <KeyboardAvoidingView behavior="padding">
        <SafeAreaView>{children}</SafeAreaView>
      </KeyboardAvoidingView>
    ),
    View: (
      <View>
        <SafeAreaView>{children}</SafeAreaView>
      </View>
    ),
  }[ContentContainerIdentifier];

  // Return the content container
  return ContentContainer;
};

/**
 * Layout Sub-Components
 *
 * These are the sub-components that make up the layout.
 * They each need to have a displayName so that they can be
 * accessed from the Layout component.
 *
 * Example:
 *  Layout.Header
 *  Layout.ChatHeader
 *  ...
 *
 * Make sure they are assigned to the Layout component
 *
 * Example:
 * Layout.Header = Header
 * Layout.ChatHeader = ChatHeader
 * ...
 */
Header.displayName = "Layout.Header";
Layout.Header = Header;

CustomHeader.displayName = "Layout.CustomHeader";
Layout.CustomHeader = CustomHeader;

Footer.displayName = "Layout.Footer";
Layout.Footer = Footer;

export default Layout;
