/*
 * Created on Sat Mar 16 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { View, ViewProps } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import IconButton from "@/ui/IconButton";
import SafeAreaView from "@/ui/SafeAreaView";
import InvisibleWrapper from "@/ui/InvisibleWrapper";

interface HeaderProps extends ViewProps {
  title: string;
  subtitle: string;
  hasBackButton?: boolean;
  hasMenuButton?: boolean;
  onMenuButtonPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  children,
  hasBackButton = false,
  hasMenuButton = false,
  onMenuButtonPress,
  ...props
}) => {
  const navigation = useNavigation();

  const onBackArrowPress = () => {
    navigation.goBack();
  };

  const safeAreaStyles = tw.style("w-full border-b border-gray-200");
  const headerStyles = tw.style(
    "justify-between flex-row items-center px-6 py-3",
  );
  const leftColumnStyles = tw.style("flex-row items-center gap-4");

  return (
    <SafeAreaView position="top" style={safeAreaStyles} {...props}>
      <View style={headerStyles}>
        <View style={leftColumnStyles}>
          <InvisibleWrapper visible={hasBackButton}>
            <IconButton
              size="sm"
              color="secondary"
              iconName="ArrowLeft"
              style={tw`self-center`}
              onPress={onBackArrowPress}
            />
          </InvisibleWrapper>

          <View>
            <Text type="h4">{title}</Text>
            <Text type="p3">{subtitle}</Text>
          </View>
        </View>

        <InvisibleWrapper visible={hasMenuButton}>
          <IconButton
            size="sm"
            color="secondary"
            iconName="Info"
            onPress={onMenuButtonPress}
          />
        </InvisibleWrapper>
      </View>

      {children}
    </SafeAreaView>
  );
};

export default Header;
