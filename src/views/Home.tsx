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

import type { IPNM } from "@/types";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Skeleton from "@/ui/Skeleton";
import ListItem from "@/ui/ListItems/ListItem";
import FlatList from "@/ui/FlatList";
import CopyView from "@/ui/CopyView";
import format from "@/lib/util/format";
import Information from "@/ui/Information";
import { useUser } from "@/providers/User";
import { useGetPnms } from "@/hooks/api/pnms";
import ListItemLoader from "@/ui/Loaders/ListItem";
import ErrorMessage from "@/components/ErrorMessage";
import { useBottomSheetStore } from "@/store";
import RefreshControlView from "@/ui/RefreshControlView";

const HomeView = () => {
  const pnmQuery = useGetPnms();
  const { user, chapter } = useUser();
  const bottomSheetStore = useBottomSheetStore();

  const onRecentPnmPress = (pnm: IPNM) => {
    bottomSheetStore.open("PNM", { pnm });
  };

  const onChapterPhoneNumberPress = () => {
    bottomSheetStore.open("CUSTOM_PHONE_NUMBER");
  };

  const onRefresh = async () => {
    await pnmQuery.refetch();
  };

  // Loading and error states
  if (pnmQuery.isLoading) return <LoadingState />;
  if (pnmQuery.error)
    return (
      <ErrorMessage
        error={pnmQuery.error}
        description="Could not fetch account data"
      />
    );

  // Default data from the queries
  const pnms = pnmQuery.data?.pnms || [];

  // Statistics
  const pnmCount = pnms.length || 0;
  const starredPnmCount = pnms.filter((pnm) => pnm.starred).length;
  const recentPnms = pnms
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 5);

  return (
    <RefreshControlView
      tintColor="white"
      refreshing={pnmQuery.isLoading}
      onRefresh={onRefresh}
    >
      {/* White background */}
      <View style={tw`bg-white absolute h-full -z-10 w-full top-56`} />

      <View style={tw`w-full items-start p-6 gap-y-6`}>
        {/* Header */}
        <Text type="h1" numberOfLines={1} style={tw`text-white shrink`}>
          Welcome {user.firstName}
        </Text>

        {/* Chapter Statistics */}
        <Text style={tw`text-white font-semibold`}>Chapter Statistics</Text>
        <View style={tw`w-full flex-row gap-5`}>
          <ListItem
            size="sm"
            pressable={false}
            icon="UserFill"
            titleStyle={tw`text-[32px] font-semibold leading-9`}
            title={pnmCount.toString()}
            subtitle="Current PNMs registered to rush"
          />

          <ListItem
            size="sm"
            pressable={false}
            icon="StarFill"
            titleStyle={tw`text-[32px] font-semibold leading-9`}
            title={starredPnmCount.toString()}
            subtitle="PNMs saved as favorites"
          />
        </View>

        {/* Chapter Phone Number */}
        <View style={tw`gap-2`}>
          <View style={tw`flex-row gap-1 items-center`}>
            <Text style={tw`text-primary font-semibold`}>
              Chapter Phone Number
            </Text>
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
          <Text style={tw`text-primary font-semibold`}>
            Recently Added PNMs
          </Text>
          <FlatList
            scrollEnabled={false}
            data={recentPnms}
            emptyListTitle="No Recent PNMs"
            emptyListSubtitle="Add a new PNM to get started"
            renderItem={({ item: pnm }) => (
              <ListItem
                key={pnm._id}
                ph-label="recent-pnm-list-item"
                iconColor={tw.color("yellow-500")}
                icon={pnm.starred ? "StarFill" : undefined}
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
        <View style={tw`items-center flex-row w-full`}>
          <Skeleton height={40} width={"75%"} />
        </View>

        {/* Chapter Statistics */}
        <Skeleton width="30%" />
        <View style={tw`w-full flex-row gap-5`}>
          <Skeleton style={tw`flex-1`} height={164} />
          <Skeleton style={tw`flex-1`} height={164} />
        </View>

        {/* Quick Links */}
        <Text type="h4">Quick Links</Text>
        <ListItemLoader />

        {/* Recently Added PNMs */}
        <Text type="h4">Recently Added PNMs</Text>

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
