/*
 * Created on Sun Dec 24 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { SafeAreaView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import IconButton from "@/ui_v1/IconButton";
import ProgressBar from "@/ui_v1/ProgressBar";
import { hiddenContent } from "@/lib/util/layout";

interface HeaderProps {
  title: string;
  loading?: boolean;
  children?: React.ReactNode;
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
    <SafeAreaView style={safeAreaStyles}>
      <View style={headerStyles}>
        <View {...hiddenContent(hasBackButton)}>
          <IconButton
            size="sm"
            icon="ri-arrow-left-line"
            onPress={onBackArrowPress}
          />
        </View>

        <Text type="h2" style={tw`font-medium text-black`}>
          {title}
        </Text>

        <View {...hiddenContent(hasMenuButton)}>
          <IconButton
            size="sm"
            icon="ri-more-fill"
            onPress={onMenuButtonPress}
          />
        </View>
      </View>

      {children}

      <ProgressBar loading={loading} />
    </SafeAreaView>
  );
};

export default Header;
