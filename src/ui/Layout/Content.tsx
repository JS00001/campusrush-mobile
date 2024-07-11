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
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  View,
  ViewProps,
} from "react-native";
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
   * Whether or not to remove the padding from the inner container
   */
  removePadding?: boolean;
  /**
   * Scroll event throttled to 16ms, ONLY if the inner container is a ScrollView
   */
  scrollEventThrottle?: number;
  /**
   * A method for when the user begins scrolling, ONLY if the inner
   * container is a ScrollView
   */
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const Content: React.FC<ContentProps> = ({
  style,
  children,
  contentContainerStyle,
  onScroll,
  scrollEventThrottle,
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
        onScroll={onScroll}
        scrollEventThrottle={scrollEventThrottle}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={contentContainerStyles}
      >
        {children}
      </KeyboardAwareScrollView>
    ),
    ScrollView: (
      <ScrollView
        onScroll={onScroll}
        scrollEventThrottle={scrollEventThrottle}
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
    <SafeAreaView style={containerStyles}>{ContentContainer}</SafeAreaView>
  );
};

export default Content;
