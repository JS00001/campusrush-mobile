/*
 * Created on Mon Mar 18 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { View } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Headline from "@/ui/Headline";
import AppConstants from "@/constants";
import { useAuth } from "@/providers/Auth";
import { formatJSON } from "@/lib/util/string";

const Debug = () => {
  const { chapter } = useAuth();

  return (
    <View style={tw`gap-y-2`}>
      <View style={tw`rounded-xl bg-slate-100 p-4`}>
        <Headline
          title="App Version"
          subtitle={AppConstants.version as string}
        />
      </View>

      <View style={tw`rounded-xl bg-slate-100 p-4`}>
        <Text type="h3">Current Chapter</Text>
        <Text type="p4">{formatJSON(JSON.stringify(chapter))}</Text>
      </View>
    </View>
  );
};

export default Debug;
