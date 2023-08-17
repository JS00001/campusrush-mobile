/*
 * Created on Tue Aug 08 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import Icon from "react-native-remix-icon";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ViewProps, SafeAreaView, View, ScrollView } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import HeaderSvg from "@/assets/HeaderSvg";
import TermsAndConditions from "@/components/TermsAndConditions";

interface LayoutProps extends ViewProps {
  flexGap?: string;
  centerChildren?: boolean;
  style?: any;
  children?: React.ReactNode;
  scrollable?: boolean;

  termsAndConditions?: {
    color?: "light" | "dark";
    shown?: boolean;
  };

  header?: {
    cta?: String;
    title?: String;
    subtitle?: String;
    hasBackButton?: boolean;
  };
}

const Layout: React.FC<LayoutProps> = ({
  style,
  header,
  children,
  scrollable,
  centerChildren,
  termsAndConditions,
  flexGap = "24px",
}) => {
  // Allow layout to access navigation
  const navigation = useNavigation();

  // Handle back button press
  const onBackPress = () => {
    navigation.goBack();
  };

  // Styling
  const containerClasses = tw.style(
    // Base styles
    "h-full w-full items-center px-6",
    // If flexGap is provided, add gap style
    flexGap && { gap: flexGap },
    // If centerChildren is true, center the children
    centerChildren && "items-center",
    // Custom styles as provided by the style prop
    style,
  );

  if (header)
    return (
      <>
        <View style={tw`-z-10 absolute`}>
          <HeaderSvg />
        </View>

        {/* Header */}
        <View style={tw`flex-1 z-10`}>
          <View style={tw`px-6 py-8`}>
            <SafeAreaView style={tw`min-h-48 flex-col justify-between`}>
              {header.hasBackButton && (
                <TouchableOpacity
                  onPress={onBackPress}
                  style={tw`h-10 w-10 rounded-full items-center justify-center bg-navy-100`}
                >
                  <Icon name="ri-arrow-left-line" size={22} color="#fff" />
                </TouchableOpacity>
              )}
              <View style={tw`flex-1`} />

              <View style={tw`gap-y-3 `}>
                <Text style={tw`text-gray-300`}>{header.cta}</Text>
                <Text variant="header" style={tw`text-white`}>
                  {header.title}
                </Text>
                <Text style={tw`text-gray-300`}>{header.subtitle}</Text>
              </View>
            </SafeAreaView>
          </View>

          {/* Content */}
          <SafeAreaView style={tw`bg-white`}>
            {!scrollable && (
              <View style={[containerClasses, tw`py-8`]}>
                {children}
                {termsAndConditions?.shown && <TermsAndConditions />}
              </View>
            )}

            {scrollable && (
              <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={[containerClasses, tw`py-8`]}
              >
                {children}
                {termsAndConditions?.shown && <TermsAndConditions />}
              </ScrollView>
            )}
          </SafeAreaView>
        </View>
      </>
    );

  return (
    <SafeAreaView style={tw`z-10`}>
      {!scrollable && <View style={containerClasses}>{children}</View>}
      {scrollable && (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={containerClasses}
        >
          {children}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Layout;
