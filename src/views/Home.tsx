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

import type { PNM } from "@/types";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Skeleton from "@/ui/Skeleton";
import ListItem from "@/ui/ListItem";
import FlatList from "@/ui/FlatList";
import format from "@/lib/util/format";
import IconButton from "@/ui/IconButton";
import { useAuth } from "@/providers/Auth";
import ListItemLoader from "@/ui/Loaders/ListItem";
import { useBottomSheet } from "@/providers/BottomSheet";
import { useGetChapterStatistics } from "@/hooks/api/chapter";

const HomeView = () => {
  const { chapter } = useAuth();
  const navigation = useNavigation();
  const { openBottomSheet } = useBottomSheet();
  const statisticsQuery = useGetChapterStatistics();

  const onSettingsPress = () => {
    navigation.navigate("Main", {
      screen: "HomeTab",
      params: {
        screen: "Settings",
      },
    });
  };

  const onAddPNM = () => {
    openBottomSheet("CREATE_PNM");
  };

  const onRecentPnmPress = (pnm: PNM) => {
    openBottomSheet("PNM", {
      pnmId: pnm._id,
    });
  };

  if (statisticsQuery.isLoading) {
    return <LoadingState />;
  }

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

        <FlatList
          scrollEnabled={false}
          data={statisticsQuery.recentPnms}
          loading={statisticsQuery.isLoading}
          emptyListTitle="No Recent PNMs"
          emptyListSubtitle="Add a new PNM to get started"
          renderItem={({ item: pnm }) => (
            <ListItem
              key={pnm._id}
              iconColor={tw.color("yellow")}
              icon={pnm.starred ? "star-fill" : undefined}
              title={pnm.displayName}
              subtitle={format.phoneNumber(pnm.phoneNumber)}
              onPress={onRecentPnmPress.bind(null, pnm)}
            />
          )}
        />
      </View>
    </>
  );
};

const LoadingState = () => {
  return (
    <>
      <View style={tw`bg-white absolute h-full -z-10 w-full top-56`} />

      <View style={tw`w-full items-start p-6 gap-y-6`}>
        {/* Header */}
        <View style={tw`justify-between items-center flex-row w-full`}>
          <Skeleton height={40} width={"75%"} />
          <Skeleton borderRadius={999} height={54} width={54} />
        </View>

        {/* Chapter Statistics */}
        <Skeleton width="30%" />
        <View style={tw`w-full flex-row gap-5`}>
          <Skeleton style={tw`flex-1`} height={164} />
          <Skeleton style={tw`flex-1`} height={164} />
        </View>

        {/* Quick Links */}
        <Text type="h2">Quick Links</Text>
        <ListItemLoader />

        {/* Recently Added PNMs */}
        <Text type="h2">Recently Added PNMs</Text>

        <View style={tw`gap-y-2`}>
          <ListItemLoader />
          <ListItemLoader />
          <ListItemLoader />
        </View>
      </View>
    </>
  );
};

export default HomeView;
