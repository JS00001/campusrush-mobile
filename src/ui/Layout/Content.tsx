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

import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  ViewProps,
} from "react-native";
import SafeAreaView from "@/ui/SafeAreaView";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import tw from "@/lib/tailwind";

interface ContentProps extends ViewProps {
  /**
   * The distance between each child in the container, defaults
   * to 24
   */
  gap?: number;
  /**
   * The style of the outer container (SafeAreaView)
   */
  style?: any;
  /**
   * The children are wrapped in a SafeAreaView, and THEN the
   * type of container (ScrollView, View, etc.). This prop controls
   * the style of the INNER container (ScrollView, View, etc.)
   */
  contentContainerStyle?: any;
  /**
   * If true, the inner container will be a ScrollView, if false,
   * it will be a View
   */
  scrollable?: boolean;
  /**
   * If true, the inner container will be a KeyboardAvoidingView, if false,
   * it will be a View
   */
  keyboardAvoiding?: boolean;
  /**
   * Whether the inner container should have a safe area padding
   */
  safeAreaPosition?: "top" | "bottom" | "left" | "right";
  /**
   * Whether or not to remove the padding from the inner container
   */
  removePadding?: boolean;
}

const Content: React.FC<ContentProps> = ({
  style,
  children,
  contentContainerStyle,
  safeAreaPosition,
  gap = 24,
  scrollable = false,
  keyboardAvoiding = false,
  removePadding = false,
}) => {
  const containerStyles = tw.style("z-10 bg-white flex-1 h-full", style);

  const contentContainerStyles = tw.style(
    "w-full items-center",
    !removePadding && "p-6",
    gap.toString() && { gap: gap },
    contentContainerStyle,
  );

  /**
   * Get the type of the inner container based on the passed props
   */
  const ContentContainerType = (() => {
    if (scrollable && keyboardAvoiding) {
      return "KeyboardAwareScrollView";
    }

    if (scrollable) {
      return "ScrollView";
    }

    if (keyboardAvoiding) {
      return "KeyboardAvoidingView";
    }

    return "View";
  })();

  /**
   * Create the element for the proper inner container type
   */
  const ContentContainer = {
    KeyboardAwareScrollView: (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={contentContainerStyles}
      >
        {children}
      </KeyboardAwareScrollView>
    ),
    ScrollView: (
      <ScrollView
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={contentContainerStyles}
      >
        {children}
      </ScrollView>
    ),
    KeyboardAvoidingView: (
      <KeyboardAvoidingView behavior="padding" style={contentContainerStyles}>
        {children}
      </KeyboardAvoidingView>
    ),
    View: <View style={[contentContainerStyles, tw`flex-1`]}>{children}</View>,
  }[ContentContainerType];

  return (
    <SafeAreaView position={safeAreaPosition} style={containerStyles}>
      {ContentContainer}
    </SafeAreaView>
  );
};

export default Content;
