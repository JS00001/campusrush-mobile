/*
 * Created on Tue Nov 07 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */
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

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import CopyItem from "@/ui/CopyItem";
import { useAuth } from "@/providers/Authv1";
import { formatPhoneNumber } from "@/lib/util/string";

const PhoneNumber = () => {
  const { chapter } = useAuth();

  return (
    <Layout gap={16} scrollable contentContainerStyle={tw`items-start pb-6`}>
      <Layout.Header
        hasBackButton
        title="Phone Number"
        subtitle="We have assigned you a phone number that PNMs can use to contact you."
      />

      <View>
        <Text variant="title">Phone Information</Text>
        <Text variant="body">
          All messages to this phone number will show up in your "Messages"
          inbox.
        </Text>
      </View>

      <CopyItem
        label="Phone Number"
        value={formatPhoneNumber(chapter.phoneNumber)}
      />

      <CopyItem label="Phone Number ID" value={chapter?.phoneNumberId} />
    </Layout>
  );
};

export default PhoneNumber;
