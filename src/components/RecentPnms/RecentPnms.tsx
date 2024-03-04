/*
 * Created on Tue Aug 29 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useMemo } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import ListItem from "@/ui_v1/ListItem";
import { formatPhoneNumber } from "@/lib/util/string";
import { ListItemLoader } from "@/ui_v1/ListItem/Loading";

interface RecentPnmsProps {
  pnms: PNM[];
  loading?: boolean;
  onPress?: (pnm: PNM) => void;
}

const RecentPnms: React.FC<RecentPnmsProps> = ({ pnms, loading, onPress }) => {
  const loadingArray = useMemo(() => new Array(5).fill(0), []);

  return (
    <ScrollView
      style={tw`w-full`}
      contentContainerStyle={tw`gap-y-4`}
      showsVerticalScrollIndicator={false}
    >
      {/* If loading, return some placeholder skeletons */}
      {loading && loadingArray.map((_, i) => <ListItemLoader key={i} />)}

      {pnms.length === 0 && !loading && (
        <View>
          <Text type="h2" style={tw`text-center mt-5`}>
            No PNMs found
          </Text>
          <Text style={tw`text-center`}>
            Add a PNM to your chapter to get started.
          </Text>
        </View>
      )}

      {pnms.map((pnm, i) => (
        <ListItem
          key={i}
          title={`${pnm.firstName} ${pnm.lastName}`}
          subtitle={formatPhoneNumber(pnm.phoneNumber)}
          onPress={() => onPress?.(pnm)}
        />
      ))}
    </ScrollView>
  );
};

export default RecentPnms;
