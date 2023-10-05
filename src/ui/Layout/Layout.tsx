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
import Badge from "../Badge";
import IconButton from "../IconButton";

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
  ChatHeader: React.FC<ChatHeaderProps>;
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
      ((child as any).type.displayName == "Layout.Header" ||
        (child as any).type.displayName == "Layout.ChatHeader"),
  );

  // Remove the header from the children
  const LayoutChildren = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement(child) &&
      (child as any).type.displayName != "Layout.Header" &&
      (child as any).type.displayName != "Layout.ChatHeader",
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
    "w-full items-center p-6",
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
        automaticallyAdjustKeyboardInsets
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

interface ChatHeaderProps {
  pnms: PNM[];
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ pnms }) => {
  const navigation = useNavigation();

  // Whether or not the chat is a single PNM
  const isSinglePnm = pnms.length === 1;

  // Use the users name if it's a single PNM
  const header = isSinglePnm
    ? `${pnms[0].firstName} ${pnms[0].lastName}`
    : `New Message (${pnms.length} PNMs)`;

  // When the back arrow is pressed, go back to the previous screen
  const onBackArrowPress = () => navigation.goBack();

  // Styling
  const safeAreaStyles = tw.style(
    // Positioning and color
    "w-full border-b border-slate-200",
  );

  const headerStyles = tw.style(
    // Positioning and color
    "justify-between flex-row items-center px-6 py-3",
  );

  return (
    <SafeAreaView style={safeAreaStyles}>
      <View style={headerStyles}>
        <IconButton
          icon="ri-arrow-left-line"
          onPress={onBackArrowPress}
          size="sm"
        />

        <Text variant="body" style={tw`font-medium`}>
          {header}
        </Text>

        <IconButton
          icon="ri-more-fill"
          onPress={() => {}}
          size="sm"
          disabled={isSinglePnm}
          // Hide the button if it's not a single PNM
          style={tw.style("opacity-0", isSinglePnm && "opacity-100")}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`flex-row gap-0.5 pl-6 pb-3`}
      >
        {pnms.map((pnm, index) => (
          <Badge key={index} size="md" removable>
            {pnm.firstName + " " + pnm.lastName}
          </Badge>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

Header.displayName = "Layout.Header";
Layout.Header = Header;

ChatHeader.displayName = "Layout.ChatHeader";
Layout.ChatHeader = ChatHeader;

export default Layout;
