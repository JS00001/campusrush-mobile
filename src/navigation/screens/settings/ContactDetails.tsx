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
import date from "@/lib/date";
import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import Copyable from "@/ui/Copyable";
import ListItem from "@/ui/ListItem";
import { useAuth } from "@/providers/Auth";
import Information from "@/ui/Information";
import { formatPhoneNumber } from "@/lib/string";

const ContactDetails = () => {
  const { organization } = useAuth();

  return (
    <Layout gap={12} scrollable contentContainerStyle={tw`items-start`}>
      <Layout.Header
        hasBackButton
        title="Contact Details"
        subtitle="We have provisioned your account with the following information."
      />

      <View style={tw`flex-row items-center gap-x-2`}>
        <Information tooltip="Your account has been assigned a unique phone number. This is the number PNM's will use to contact you." />
        <Text variant="title">Phone Information</Text>
      </View>

      <Copyable title="Copy Phone Number" copyText={organization?.phoneNumber}>
        <ListItem
          pressable={false}
          title="Phone Number"
          subtitle={formatPhoneNumber(organization?.phoneNumber)}
        />
      </Copyable>

      <Copyable
        title="Copy Phone Number ID"
        copyText={organization?.phoneNumberId}
      >
        <ListItem
          pressable={false}
          title="Phone Number ID"
          subtitle={organization?.phoneNumberId}
        />
      </Copyable>

      <ListItem
        pressable={false}
        title="Phone Number Registered On"
        subtitle={date.toString(organization.phoneNumberCreatedAt)}
      />
    </Layout>
  );
};

export default ContactDetails;
