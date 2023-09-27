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

import { View } from "react-native";

import tw from "@/lib/tailwind";
import ListItem from "@/ui/ListItem";

interface RecentPnmsProps {
  pnms: PNM[];
  loading?: boolean;
}

const RecentPnms: React.FC<RecentPnmsProps> = ({ pnms, loading }) => {
  return (
    <View style={tw`gap-y-4 w-full`}>
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
          pressable={false}
          title={`${pnm.firstName} ${pnm.lastName}`}
          subtitle={pnm.phoneNumber}
        />
      ))}
    </View>
  );
};

export default RecentPnms;
