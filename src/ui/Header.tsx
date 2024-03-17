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

import { SafeAreaView, View, ViewProps } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Progress from "@/ui/Progress";
import IconButton from "@/ui/IconButton";
import { hiddenContent } from "@/lib/util/layout";

interface HeaderProps extends ViewProps {
  title: string;
  loading?: boolean;
  hasBackButton?: boolean;
  hasMenuButton?: boolean;
  onMenuButtonPress?: () => void;
}

// TODO: Relook at this component for cleanliness
const Header: React.FC<HeaderProps> = ({
  title,
  children,
  loading,
  hasBackButton = false,
  hasMenuButton = false,
  onMenuButtonPress,
  ...props
}) => {
  const navigation = useNavigation();

  const onBackArrowPress = () => {
    navigation.goBack();
  };

  const safeAreaStyles = tw.style("w-full border-b border-slate-200");

  const headerStyles = tw.style(
    "justify-between flex-row items-center px-6 py-3",
  );

  return (
    <SafeAreaView style={safeAreaStyles} {...props}>
      <View style={headerStyles}>
        <View {...hiddenContent(hasBackButton)}>
          <IconButton
            size="xs"
            color="secondary"
            iconName="arrow-left-line"
            onPress={onBackArrowPress}
          />
        </View>

        <Text type="h2" style={tw`font-medium text-primary`}>
          {title}
        </Text>

        <View {...hiddenContent(hasMenuButton)}>
          <IconButton
            size="xs"
            color="secondary"
            iconName="more-fill"
            onPress={onMenuButtonPress}
          />
        </View>
      </View>

      {children}

      <Progress loading={loading || false} />
    </SafeAreaView>
  );
};

export default Header;
