/*
 * Created on Mon Dec 09 2024
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

import tw from "@/lib/tailwind";
import CopyView from "@/ui/CopyView";
import Headline from "@/ui/Headline";
import format from "@/lib/util/format";
import { useUser } from "@/providers/User";
import { UseSheetFlowProps } from "@/hooks/useSheetFlow";

const Success: React.FC<UseSheetFlowProps> = () => {
  const { chapter } = useUser();

  return (
    <View style={tw`gap-4`}>
      <Headline
        title="Phone Number Created"
        subtitle="Your phone number has been created. You can now use it to send and receive messages with potential new members."
      />

      <CopyView
        title="Chapter Phone Number"
        content={format.phoneNumber(chapter.phoneNumber)}
      />
    </View>
  );
};

export default Success;
