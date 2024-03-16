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

import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import ListItem from "@/ui/ListItem";
import IconButton from "@/ui/IconButton";
import { useAuth } from "@/providers/Auth";
import RecentPnms from "@/components/RecentPnms";
import { useBottomSheets } from "@/providers/BottomSheet";
import { useGetChapterStatistics } from "@/hooks/api/chapter";

const HomeView = () => {
  const { chapter } = useAuth();
  const navigation = useNavigation();
  const { openBottomSheet } = useBottomSheets();
  const statisticsQuery = useGetChapterStatistics();

  const onSettingsPress = () => {
    (navigation.navigate as any)("Settings");
  };

  const onAddPNM = () => {
    openBottomSheet("CREATE_PNM");
  };

  const onRecentPnmPress = (pnm: PNM) => {
    openBottomSheet("PNM", {
      pnmId: pnm._id,
    });
  };

  // TODO: Add full loading skeleton for the entire screen

  return (
    <>
      {/* White background */}
      <View style={tw`bg-white absolute h-full -z-10 w-full top-56`} />

      <View style={tw`w-full items-start p-6 gap-y-6`}>
        {/* Header */}
        <View style={tw`justify-between items-center flex-row w-full`}>
          <Text type="h1" numberOfLines={1} style={tw`text-white shrink`}>
            Welcome {chapter.firstName}
          </Text>
          <IconButton
            color="primary"
            size="md"
            iconName="settings-4-fill"
            onPress={onSettingsPress}
          />
        </View>

        {/* Chapter Statistics */}
        <Text type="h2" style={tw`text-white`}>
          Chapter Statistics
        </Text>
        <View style={tw`w-full flex-row gap-5`}>
          <ListItem
            size="sm"
            pressable={false}
            icon="user-fill"
            titleStyle={tw`text-[32px] font-semibold leading-9`}
            title={statisticsQuery.pnmCount?.toString() || "0"}
            subtitle="Current PNMs registered to rush"
          />

          <ListItem
            size="sm"
            pressable={false}
            icon="user-star-fill"
            titleStyle={tw`text-[32px] font-semibold leading-9`}
            title={statisticsQuery.starredPnmCount?.toString() || "0"}
            subtitle="PNMs saved as favorites"
          />
        </View>

        {/* Quick Links */}
        <Text type="h2">Quick Links</Text>
        <ListItem
          size="lg"
          icon="user-add-fill"
          title="Add New PNM"
          subtitle="Add a new PNM to the system"
          onPress={onAddPNM}
        />

        {/* Recently Added PNMs */}
        <Text type="h2">Recently Added PNMs</Text>
        <RecentPnms
          pnms={statisticsQuery.recentPnms}
          onPress={onRecentPnmPress}
          loading={
            statisticsQuery.isLoading && !statisticsQuery.recentPnms.length
          }
        />
      </View>
    </>
  );
};

export default HomeView;
