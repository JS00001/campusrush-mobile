/*
 * Created on Sun Aug 11 2024
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
import CopyView from "@/ui/CopyView";
import format from "@/lib/util/format";
import { useUser } from "@/providers/User";

const PhoneNumberView = () => {
  const { chapter } = useUser();

  const phoneNumber =
    format.phoneNumber(chapter.phoneNumber) || "Processing... Come back later.";

  return (
    <>
      <View>
        <Text type="h4">Phone Information</Text>
        <Text>
          All messages to this phone number will show up in your 'Messages'
          inbox.
        </Text>
      </View>

      <CopyView title="Phone Number" content={phoneNumber} />
    </>
  );
};

export default PhoneNumberView;
