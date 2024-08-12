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
import SafeAreaView from "../SafeAreaView";

interface FooterProps extends ViewProps {
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
}

const Footer: React.FC<FooterProps> = ({
  scrollable,
  keyboardAvoiding,
  children,
  ...props
}) => {
  /**
   * Get the type of the inner container based on the passed props
   */
  const ContentContainerType = (() => {
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
    ScrollView: (
      <ScrollView
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled"
      >
        <SafeAreaView position="bottom" {...props}>
          {children}
        </SafeAreaView>
      </ScrollView>
    ),
    KeyboardAvoidingView: (
      <KeyboardAvoidingView behavior="padding">
        <SafeAreaView position="bottom" {...props}>
          {children}
        </SafeAreaView>
      </KeyboardAvoidingView>
    ),
    View: (
      <View>
        <SafeAreaView position="bottom" {...props}>
          {children}
        </SafeAreaView>
      </View>
    ),
  }[ContentContainerType];

  return ContentContainer;
};

export default Footer;
