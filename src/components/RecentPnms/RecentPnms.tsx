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

import { ScrollView } from "react-native-gesture-handler";

import tw from "@/lib/tailwind";
import ListItem from "@/ui/ListItem";
import { formatPhoneNumber } from "@/lib/string";

interface RecentPnmsProps {
  pnms: PNM[];
  loading?: boolean;
  onPress?: (pnm: PNM) => void;
}

const RecentPnms: React.FC<RecentPnmsProps> = ({ pnms, loading, onPress }) => {
  return (
    <ScrollView
      style={tw`w-full`}
      contentContainerStyle={tw`gap-y-4`}
      showsVerticalScrollIndicator={false}
    >
      {/* If loading, return some placeholder skeletons */}
      {loading &&
        new Array(5)
          .fill(0)
          .map((_, i) => (
            <ListItem key={i} title="" subtitle="" loading pressable={false} />
          ))}

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
