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

import type { IPNM } from "@/types";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Skeleton from "@/ui/Skeleton";
import ListItem from "@/ui/ListItem";
import FlatList from "@/ui/FlatList";
import CopyView from "@/ui/CopyView";
import format from "@/lib/util/format";
import IconButton from "@/ui/IconButton";
import { useAuth } from "@/providers/Auth";
import Information from "@/ui/Information";
import ListItemLoader from "@/ui/Loaders/ListItem";
import { useBottomSheet } from "@/providers/BottomSheet";
import RefreshControlView from "@/ui/RefreshControlView";
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

  const onRefresh = async () => {
    await statisticsQuery.refetch();
  };

  const onRecentPnmPress = (pnm: IPNM) => {
    openBottomSheet("PNM", {
      pnmId: pnm._id,
    });
  };

  const onChapterPhoneNumberPress = () => {
    openBottomSheet("CUSTOM_PHONE_NUMBER");
  };

  if (statisticsQuery.isLoading) {
    return <LoadingState />;
  }

  return (
    <RefreshControlView
      tintColor="white"
      refreshing={statisticsQuery.isLoading}
      onRefresh={onRefresh}
    >
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
        <Text type="h3" style={tw`text-white`}>
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

        {/* Chapter Phone Number */}
        <View style={tw`gap-2`}>
          <View style={tw`flex-row gap-1 items-center`}>
            <Text type="h3">Chapter Phone Number</Text>
            <Information size="sm" onPress={onChapterPhoneNumberPress} />
          </View>
          <CopyView
            title="Chapter Phone Number"
            content={
              format.phoneNumber(chapter.phoneNumber) ||
              "Processing... Come back later."
            }
          />
        </View>

        {/* Recently Added PNMs */}
        <View style={tw`gap-2 w-full`}>
          <Text type="h3">Recently Added PNMs</Text>
          <FlatList
            scrollEnabled={false}
            data={statisticsQuery.recentPnms}
            loading={statisticsQuery.isLoading}
            emptyListTitle="No Recent PNMs"
            emptyListSubtitle="Add a new PNM to get started"
            renderItem={({ item: pnm }) => (
              <ListItem
                key={pnm._id}
                ph-label="recent-pnm-list-item"
                iconColor={tw.color("yellow")}
                icon={pnm.starred ? "star-fill" : undefined}
                title={pnm.displayName}
                subtitle={format.phoneNumber(pnm.phoneNumber)}
                onPress={onRecentPnmPress.bind(null, pnm)}
              />
            )}
          />
        </View>
      </View>
    </RefreshControlView>
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
        <Text type="h3">Quick Links</Text>
        <ListItemLoader />

        {/* Recently Added PNMs */}
        <Text type="h3">Recently Added PNMs</Text>

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
