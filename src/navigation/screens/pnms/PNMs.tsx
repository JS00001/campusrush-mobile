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
import { MenuView } from "@react-native-menu/menu";

import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import usePnms from "@/hooks/usePnms";
import TextInput from "@/ui/TextInput";
import IconButton from "@/ui/IconButton";
import PnmsList from "@/components/PnmsList";

const PNMs = () => {
  const { pnms, refetch } = usePnms();

  const onRefetch = async () => {
    await refetch();
  };

  return (
    <Layout gap={8}>
      <Layout.Header
        title="PNMs"
        subtitle="View and manage all potential new members"
      />

      <View style={tw`flex-row w-full gap-x-2`}>
        <TextInput
          icon="ri-search-line"
          variant="alternate"
          placeholder="Search"
          containerStyle={tw`flex-shrink`}
        />

        <IconButton icon="ri-filter-3-fill" style={tw`flex-grow`} />
      </View>
      <PnmsList pnms={pnms} onRefetch={onRefetch} />
    </Layout>
  );
};

export default PNMs;
