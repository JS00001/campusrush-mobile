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

import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import IconButton from "@/ui/IconButton";
import SafeAreaView from "@/ui/SafeAreaView";
import HeaderBackground from "@/components/Backgrounds/Header";

interface HeaderProps {
  title: string;
  subtitle: string;
  hasBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  hasBackButton = false,
}) => {
  const navigation = useNavigation();

  const onBackPress = () => {
    navigation.goBack();
  };

  const containerStyles = tw.style("px-6 py-8 z-10");

  const contentContainerStyles = tw.style(
    "min-h-[132px] flex-col gap-y-4 mt-6",
    hasBackButton && "justify-between",
    !hasBackButton && "justify-end",
  );

  return (
    <>
      {/* Background Circles */}
      <View style={tw`absolute w-full h-full`}>
        <HeaderBackground />
      </View>

      {/* Header Content */}
      <View style={containerStyles}>
        <SafeAreaView style={contentContainerStyles}>
          {hasBackButton && (
            <IconButton
              size="md"
              iconName="ArrowLeft"
              color="primary"
              onPress={onBackPress}
            />
          )}

          <View style={tw`gap-y-2`}>
            <Text type="h1" style={tw`text-white`}>
              {title}
            </Text>
            <Text style={tw`text-gray-300`}>{subtitle}</Text>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default Header;
