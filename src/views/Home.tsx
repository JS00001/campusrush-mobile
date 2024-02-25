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

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import ActionCard from "@/ui/ActionCard";
import IconButton from "@/ui/IconButton";
import { useAuth } from "@/providers/Auth";
import RecentPnms from "@/components/RecentPnms";
import { useBottomSheets } from "@/providers/BottomSheet";
import { useStatisticsStore } from "@/store";
import { useNavigation } from "@react-navigation/native";

const HomeView = () => {
  const { chapter } = useAuth();
  const navigation = useNavigation();
  const store = useStatisticsStore();
  const { handlePresentModalPress } = useBottomSheets();

  const onSettingsPress = () => {
    (navigation.navigate as any)("Settings");
  };

  const onAddPNM = () => {
    handlePresentModalPress("ADD_PNM");
  };

  const onRecentPnmPress = (pnm: PNM) => {
    handlePresentModalPress("PNM", {
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
            title={store.pnmCount?.toString() || "0"}
            subtitle="Current PNMs registered to rush"
            loading={store.isLoading && store.pnmCount === undefined}
          />
          <ActionCard
            size="md"
            pressable={false}
            icon="ri-user-star-fill"
            title={store.starredPnmCount?.toString() || "0"}
            subtitle="PNMs saved as favorites"
            loading={store.isLoading && store.starredPnmCount === undefined}
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
          pnms={store.recentPnms}
          onPress={onRecentPnmPress}
          loading={store.isLoading && store.recentPnms === undefined}
        />
      </View>
    </>
  );
};

export default HomeView;
