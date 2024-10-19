/*
 * Created on Sun Oct 15 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useEffect } from "react";
import { Keyboard, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import tw from "@/lib/tailwind";
import Header from "@/ui/Header";
import Skeleton from "@/ui/Skeleton";
import format from "@/lib/util/format";
import SafeAreaView from "@/ui/SafeAreaView";
import { useGetPnm } from "@/hooks/api/pnms";
import { useBottomSheet } from "@/providers/BottomSheet";

interface DirectMessageHeaderProps {
  pnmId: string;
}

const DirectMessageHeader: React.FC<DirectMessageHeaderProps> = ({ pnmId }) => {
  const pnmQuery = useGetPnm(pnmId);
  const navigation = useNavigation();
  const { openBottomSheet } = useBottomSheet();

  useEffect(() => {
    if (pnmQuery.isLoading) return;

    // If we cannot find a PNM with the given ID, navigate back
    if (!pnmQuery.pnm) navigation.goBack();
  }, [pnmQuery.pnm]);

  const onMenuButtonPress = () => {
    Keyboard.dismiss();

    openBottomSheet("PNM", {
      pnmId,
    });
  };

  if (!pnmQuery.pnm) return <LoadingState />;

  const pnm = pnmQuery.pnm;

  return (
    <Header
      hasBackButton
      hasMenuButton
      title={pnm.displayName}
      subtitle={format.phoneNumber(pnm.phoneNumber)}
      onMenuButtonPress={onMenuButtonPress}
    />
  );
};

const LoadingState = () => {
  const safeAreaStyles = tw.style("w-full border-b border-gray-200");

  const headerStyles = tw.style(
    "justify-between flex-row items-center px-6 py-3",
  );

  return (
    <SafeAreaView position="top" style={safeAreaStyles}>
      <View style={headerStyles}>
        <View style={tw`flex-row items-center gap-4`}>
          <Skeleton height={36} width={36} borderRadius={999} />

          <View style={tw`gap-1`}>
            <Skeleton width={100} height={20} borderRadius={6} />
            <Skeleton width={165} height={16} borderRadius={6} />
          </View>
        </View>

        <Skeleton height={36} width={36} borderRadius={999} />
      </View>
    </SafeAreaView>
  );
};

export default DirectMessageHeader;
