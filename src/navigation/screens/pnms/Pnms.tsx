/*
 * Created on Mon Aug 07 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { MenuView } from "@react-native-menu/menu";
import { ActivityIndicator, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import TextInput from "@/ui/TextInput";
import IconButton from "@/ui/IconButton";
import StatusIcon from "@/ui/StatusIcon";
import { PnmsStatus } from "@/state/pnms";
import PnmsList from "@/components/PnmsList";
import usePnmsList from "@/hooks/pnms/usePnmsList";

interface PNMScreenProps {
  navigation: NativeStackNavigationProp<any>;
  route: any;
}

const PNMs: React.FC<PNMScreenProps> = ({ navigation, route }) => {
  const {
    pnms,
    status,
    isLoading,
    searchQuery,
    otherActions,
    filterActions,
    onRefetch,
    onOtherPress,
    onFilterPress,
    setSearchQuery,
  } = usePnmsList();

  // Define a placeholder of how many PNMs are being searched (if any)
  const searchPlaceholder = `Search ${
    pnms.length ? `${pnms.length} ` : ""
  }PNMs`;

  return (
    <>
      {status != PnmsStatus.Idle && (
        <StatusIcon>
          <StatusIcon.Icon>
            {status == PnmsStatus.Loading && (
              <ActivityIndicator size="large" color="white" />
            )}
          </StatusIcon.Icon>
        </StatusIcon>
      )}

      <Layout gap={8}>
        <Layout.Header
          title="PNMs"
          subtitle="View and manage all potential new members"
        />

        <View style={tw`flex-row w-full gap-x-1`}>
          <TextInput
            autoCorrect={false}
            icon="ri-search-line"
            variant="alternate"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
            containerStyle={tw`flex-shrink`}
          />

          <MenuView
            title="Filter By"
            onPressAction={onFilterPress}
            actions={filterActions}
          >
            <IconButton icon="ri-filter-3-fill" style={tw`flex-grow`} />
          </MenuView>

          <MenuView actions={otherActions} onPressAction={onOtherPress}>
            <IconButton icon="ri-more-fill" style={tw`flex-grow`} />
          </MenuView>
        </View>

        <PnmsList loading={isLoading} pnms={pnms} onRefetch={onRefetch} />
      </Layout>
    </>
  );
};

export default PNMs;
