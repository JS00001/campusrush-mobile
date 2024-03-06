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
import ActionCard from "@/ui/ActionCard";
import IconButton from "@/ui/IconButton";
import { useAuth } from "@/providers/Authv1";
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

  return (
    <>
      {/* White background */}
      <View style={tw`bg-white absolute h-full -z-10 w-full top-56`} />

      <View style={tw`w-full items-start px-6 pt-6 gap-y-6`}>
        {/* Header */}
        <View style={tw`justify-between items-center flex-row w-full`}>
          <Text
            variant="header"
            numberOfLines={1}
            style={tw`text-white shrink`}
          >
            Welcome {chapter.firstName}
          </Text>
          <IconButton
            color="white"
            size="md"
            icon="ri-settings-4-fill"
            style={tw`bg-navy-100 shadow-lg`}
            onPress={onSettingsPress}
          />
        </View>

        {/* Chapter Statistics */}
        <Text variant="title" style={tw`text-white`}>
          Chapter Statistics
        </Text>
        <View style={tw`w-full flex-row gap-5`}>
          <ActionCard
            size="md"
            pressable={false}
            icon="ri-user-fill"
            title={statisticsQuery.pnmCount?.toString() || "0"}
            subtitle="Current PNMs registered to rush"
            loading={
              statisticsQuery.isLoading &&
              statisticsQuery.pnmCount === undefined
            }
          />
          <ActionCard
            size="md"
            pressable={false}
            icon="ri-user-star-fill"
            title={statisticsQuery.starredPnmCount?.toString() || "0"}
            subtitle="PNMs saved as favorites"
            loading={
              statisticsQuery.isLoading &&
              statisticsQuery.starredPnmCount === undefined
            }
          />
        </View>

        {/* Quick Links */}
        <Text variant="title">Quick Links</Text>
        <ActionCard
          title="New PNM"
          subtitle="Add a new PNM to the system"
          icon="ri-user-add-fill"
          onPress={onAddPNM}
        />

        {/* Recently Added PNMs */}
        <Text variant="title">Recently Added PNMs</Text>
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
