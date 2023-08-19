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
  ViewProps,
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Icon from "react-native-remix-icon";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import HeaderSvg from "@/assets/HeaderSvg";
import TermsAndConditions from "@/components/TermsAndConditions";

interface LayoutProps extends ViewProps {
  children?: React.ReactNode;
  color?: "light" | "dark";
  contentContainerStyle?: any;
  gap?: number;
  hasTermsAndConditions?: boolean;
  keyboardAvoiding?: boolean;
  scrollable?: boolean;
  style?: any;
}

interface LayoutComponents {
  Header: React.FC<HeaderProps>;
}

const Layout: React.FC<LayoutProps> & LayoutComponents = ({
  style,
  children,
  contentContainerStyle,
  hasTermsAndConditions,
  gap = 24,
  color = "dark",
  scrollable = false,
  keyboardAvoiding = false,
}) => {
  // The header component if passed
  const LayoutHeader = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement(child) &&
      (child as any).type.displayName == "Layout.Header",
  );

  // Remove the header from the children
  const LayoutChildren = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement(child) &&
      (child as any).type.displayName != "Layout.Header",
  );

  // Styling
  const safeAreaStyles = tw.style(
    // Positioning and color
    "z-10 bg-white",
    // Custom styles as provided by the style prop
    style,
  );

  const contentContainerStyles = tw.style(
    // Sizing and positioning
    "h-full w-full items-center p-6",
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
        {hasTermsAndConditions && <TermsAndConditions color={color} />}
      </KeyboardAwareScrollView>
    ),
    ScrollView: (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={contentContainerStyles}
      >
        {LayoutChildren}
        {hasTermsAndConditions && <TermsAndConditions color={color} />}
      </ScrollView>
    ),
    KeyboardAvoidingView: (
      <KeyboardAvoidingView
        behavior="padding"
        style={contentContainerStyles}
        // contentContainerStyle={contentContainerStyle}
      >
        {LayoutChildren}
        {hasTermsAndConditions && <TermsAndConditions color={color} />}
      </KeyboardAvoidingView>
    ),
    View: (
      <View style={contentContainerStyles}>
        {LayoutChildren}
        {hasTermsAndConditions && <TermsAndConditions color={color} />}
      </View>
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
    </View>
  );
};

interface HeaderProps {
  title?: string;
  subtitle?: string;
  hasBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, hasBackButton }) => {
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
        <SafeAreaView style={tw`h-44 flex-col justify-between`}>
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

Header.displayName = "Layout.Header";
Layout.Header = Header;

export default Layout;
