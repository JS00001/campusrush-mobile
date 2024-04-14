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
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import tw from "@/lib/tailwind";
import Header from "@/ui/Header";
import Skeleton from "@/ui/Skeleton";
import SafeAreaView from "@/ui/SafeAreaView";
import { useGetPnm } from "@/hooks/api/pnms";
import { useBottomSheet } from "@/providers/BottomSheet";

interface DirectMessageHeaderProps {
  pnm: PNM;
  loading: boolean;
}

const DirectMessageHeader: React.FC<DirectMessageHeaderProps> = ({
  pnm,
  loading,
}) => {
  const navigation = useNavigation();
  const { openBottomSheet } = useBottomSheet();

  const pnmQuery = useGetPnm(pnm._id);
  const title = `${pnmQuery.pnm?.firstName} ${pnmQuery.pnm?.lastName}`;

  const onMenuButtonPress = () => {
    openBottomSheet("PNM", {
      pnmId: pnm._id,
    });
  };

  useEffect(() => {
    if (pnmQuery.isLoading) {
      return;
    }

    if (!pnmQuery.pnm) navigation.goBack();
  }, [pnmQuery.pnm]);

  if (pnmQuery.isLoading) return <LoadingState />;

  return (
    <Header
      hasBackButton
      hasMenuButton
      title={title}
      loading={loading}
      onMenuButtonPress={onMenuButtonPress}
    />
  );
};

const LoadingState = () => {
  const safeAreaStyles = tw.style("w-full border-b border-slate-200");

  const headerStyles = tw.style(
    "justify-between flex-row items-center px-6 py-3",
  );

  return (
    <SafeAreaView style={safeAreaStyles}>
      <View style={headerStyles}>
        <Skeleton height={36} width={36} borderRadius={999} />

        <Skeleton width={100} />

        <Skeleton height={36} width={36} borderRadius={999} />
      </View>
    </SafeAreaView>
  );
};

export default DirectMessageHeader;
