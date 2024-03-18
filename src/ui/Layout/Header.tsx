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

import { SafeAreaView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Text from "@/ui/Text";
import Badge from "@/ui/Badge";
import tw from "@/lib/tailwind";
import IconButton from "@/ui/IconButton";
import HeaderSvg from "@/assets/HeaderSvg";

interface HeaderProps {
  title: string;
  subtitle: string;
  beta?: boolean;
  hasBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  beta = false,
  hasBackButton = false,
}) => {
  const navigation = useNavigation();

  const onBackPress = () => {
    navigation.goBack();
  };

  const containerStyles = tw.style("px-6 py-8 z-10");

  const contentContainerStyles = tw.style(
    "min-h-[144px] flex-col gap-y-4 mt-6",
    hasBackButton && "justify-between",
    !hasBackButton && "justify-end",
  );

  return (
    <>
      {/* Background Circles */}
      <View style={tw`absolute w-full h-full`}>
        <HeaderSvg />
      </View>

      {/* Header Content */}
      <View style={containerStyles}>
        <SafeAreaView style={contentContainerStyles}>
          {hasBackButton && (
            <IconButton
              size="sm"
              iconName="arrow-left-line"
              color="primary"
              onPress={onBackPress}
            />
          )}

          <View style={tw`gap-y-2`}>
            {beta && (
              <Badge size="sm" style={tw`bg-blue-500 mb-2`}>
                Beta
              </Badge>
            )}

            <Text type="h1" style={tw`text-white`}>
              {title}
            </Text>
            <Text style={tw`text-slate-300`}>{subtitle}</Text>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default Header;
